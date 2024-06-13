import ghpages from "gh-pages";
import { ANSI } from "../src/config/apps/terminal.config";
import { BASE_URL, BUILD_DIR, COMMIT_MESSAGE, DOMAIN, REPO_URL } from "../src/config/deploy.config";

function deploy() {
	console.log(`${ANSI.fg.yellow}Deploying to GitHub Pages...${ANSI.reset}`);
	console.log(`Domain: ${ANSI.fg.cyan + DOMAIN + ANSI.reset}`);
	console.log(`Commit message: ${ANSI.fg.cyan + COMMIT_MESSAGE + ANSI.reset}`);
	console.log(`Repository: ${ANSI.fg.cyan + REPO_URL + ANSI.reset}\n`);

	void ghpages.publish(BUILD_DIR, {
		repo: REPO_URL,
		cname: DOMAIN,
		message: COMMIT_MESSAGE
	}, (error) => {
		if (error == null)
			return;

		console.error(error);
		console.log(`${ANSI.fg.red}⚠ Failed to deploy${ANSI.reset}`);
		process.exit(1);
	}).then(() => {
		console.log(`${ANSI.fg.green}✓ Successfully deployed to ${ANSI.fg.cyan + BASE_URL + ANSI.reset}`);
	});
}

deploy();