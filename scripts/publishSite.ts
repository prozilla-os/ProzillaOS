import ghpages from "gh-pages";
import { BASE_URL, BUILD_DIR, COMMIT_MESSAGE, DOMAIN, REPO_URL } from "../demo/src/config/deploy.config";
import path from "node:path";
import fs from "node:fs";
import { name } from "../package.json";
import { Logger } from "../packages/shared/src/features";
import { listDirectory } from "../packages/dev-tools/src/features";

const logger = new Logger();
const isDryRun = process.argv.includes("--dry");

function publishSite() {
	logger.parameter("Context", name);

	const buildPath = path.resolve(__dirname, "..", BUILD_DIR);
	if (!fs.existsSync(buildPath) || fs.readdirSync(buildPath).length === 0) {
		logger.error(`Build directory not found or empty: ${BUILD_DIR}`);
		process.exit(1);
	}

	logger.pending("Publishing to GitHub Pages...");
	logger.properties({
		"Domain": DOMAIN,
		"Commit message": COMMIT_MESSAGE,
		"Repository": REPO_URL,
	});

	logger.info(`Contents of ${logger.highlight(BUILD_DIR + "/")}:`);
	logger.lines(listDirectory(buildPath).map((item) => `- ${item}`));

	if (isDryRun) {
		logger.success("Dry run complete");
		return;
	}

	void ghpages.publish(buildPath, {
		repo: REPO_URL,
		message: COMMIT_MESSAGE,
		dotfiles: true,
		nojekyll: true,
	}, (error) => {
		if (error == null)
			return;

		logger.error(error).error("Failed to publish");
		process.exit(1);
	}).then(() => {
		logger.success(`Published site: ${logger.highlight(BASE_URL)}`);
	});
}

publishSite();
