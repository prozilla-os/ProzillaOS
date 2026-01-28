import ghpages from "gh-pages";
import { BASE_URL, BUILD_DIR, COMMIT_MESSAGE, DOMAIN, REPO_URL } from "../demo/src/config/deploy.config";
import path from "node:path";
import { name } from "../package.json";
import { Logger } from "../packages/shared/src/features";

const logger = new Logger();

function publishSite() {
	logger.parameter("Context", name);

	logger.pending("Publishing to GitHub Pages...");
	logger.properties({
		"Domain": DOMAIN,
		"Commit message": COMMIT_MESSAGE,
		"Repository": REPO_URL,
	});

	void ghpages.publish(path.resolve(__dirname, "../", BUILD_DIR), {
		repo: REPO_URL,
		message: COMMIT_MESSAGE,
		dotfiles: true,
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