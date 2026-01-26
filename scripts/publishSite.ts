import ghpages from "gh-pages";
import { BASE_URL, BUILD_DIR, COMMIT_MESSAGE, DOMAIN, REPO_URL } from "../demo/src/config/deploy.config";
import path from "node:path";
import { name } from "../package.json";
import { Print } from "../packages/shared/src/features";

function publishSite() {
	Print.parameter("Context", name);

	Print.pending("Publishing to GitHub Pages...");
	Print.properties({
		"Domain": DOMAIN,
		"Commit message": COMMIT_MESSAGE,
		"Repository": REPO_URL
	});

	void ghpages.publish(path.resolve(__dirname, "../", BUILD_DIR), {
		repo: REPO_URL,
		message: COMMIT_MESSAGE,
		dotfiles: true
	}, (error) => {
		if (error == null)
			return;

		Print.error(error).error("Failed to publish");
		process.exit(1);
	}).then(() => {
		Print.success(`Published site: ${Print.highlight(BASE_URL)}`);
	});
}

publishSite();