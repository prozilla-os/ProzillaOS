import fs from "node:fs";
import { REPO } from "../src/config/deploy.config";
import { ANSI } from "../../shared/src/constants";
import { name } from "../package.json";

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

	console.log(`${ANSI.fg.yellow}Fetching: ${ANSI.fg.cyan + treeUrl + ANSI.reset}`);

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

		console.log(`Files found: ${ANSI.fg.cyan + files.length + ANSI.reset}`);
		console.log(`Folders found: ${ANSI.fg.cyan + folders.length + ANSI.reset}`);
		console.log(`Truncated: ${ANSI.fg.cyan + response.truncated.toString() + ANSI.reset}`);

		const tree = JSON.stringify({ files, folders });
		callback(tree);
	}).catch((error) => {
		console.error(error);
	});
}

try {
	console.log(`Context: ${ANSI.decoration.bold}${name}${ANSI.reset}\n`);

	fetchRepositoryTree((tree) => {
		fs.mkdirSync(TREE_DIRECTORY, { recursive: true });
		fs.writeFileSync(TREE_PATH, tree, { flag: "w+" });
		console.log(`\n${ANSI.fg.green}✓ Generated repository tree: ${ANSI.fg.cyan + TREE_PATH + ANSI.reset}`);
	});
} catch (error) {
	console.error(error);
	console.log(`${ANSI.fg.red}⚠ Failed to fetch repository${ANSI.reset}`);
	process.exit(1);
}