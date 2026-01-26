import fs from "node:fs";
import { REPO } from "../src/config/deploy.config";
import { name } from "../package.json";
import { Print } from "@prozilla-os/shared";

const API_URL = "https://api.github.com/";
const TREE_DIRECTORY = "public/config";
const TREE_PATH = `${TREE_DIRECTORY}/tree.json`;

interface ReponseType {
	sha: string;
	url: string;
	tree: {
		path: string;
		mode: string;
		type: string;
		sha: string;
		url: string;
	}[];
	truncated: boolean;
}

function fetchRepositoryTree(callback: (tree: string) => void) {
	const treeUrl = `${API_URL}repos/${REPO.owner}/${REPO.name}/git/trees/${REPO.branch}?recursive=true`;

	Print.fetching(treeUrl);

	void fetch(treeUrl).then((response) =>
		response.json()
	).then((response: ReponseType) => {
		const items = response.tree;

		const files: string[] = [];
		const folders: string[] = [];

		items.forEach(({ path, type }) => {
			if (type === "tree") {
				folders.push(path);
			} else {
				files.push(path);
			}
		});

		Print.value("Files found", files.length)
			.value("Folders found", folders.length)
			.value("Truncated", response.truncated);

		const tree = JSON.stringify({ files, folders });
		callback(tree);
	}).catch(Print.error);
}

try {
	Print.parameter("Context", name);

	fetchRepositoryTree((tree) => {
		fs.mkdirSync(TREE_DIRECTORY, { recursive: true });
		fs.writeFileSync(TREE_PATH, tree, { flag: "w+" });
		Print.newLine().success("Generated repository tree: " + Print.highlight(TREE_PATH));
	});
} catch (error) {
	Print.error(error).error("Failed to fetch repository");
	process.exit(1);
}