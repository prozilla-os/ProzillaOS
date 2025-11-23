import ghpages from "gh-pages";
import { ANSI } from "../packages/shared/src/constants";
import {
	BASE_URL,
	BUILD_DIR,
	COMMIT_MESSAGE,
	DOMAIN,
	REPO_URL,
} from "../web/src/config/deploy.config";
import path from "node:path";
import { name } from "../package.json";

function publishSite() {
	console.log(`Context: ${ANSI.decoration.bold}${name}${ANSI.reset}\n`);

	console.log(`${ANSI.fg.yellow}Publishing to GitHub Pages...${ANSI.reset}`);
	console.log(`- Domain: ${ANSI.fg.cyan + DOMAIN + ANSI.reset}`);
	console.log(
		`- Commit message: ${ANSI.fg.cyan + COMMIT_MESSAGE + ANSI.reset}`
	);
	console.log(`- Repository: ${ANSI.fg.cyan + REPO_URL + ANSI.reset}\n`);

	void ghpages
		.publish(
			path.resolve(__dirname, "../", BUILD_DIR),
			{
				repo: REPO_URL,
				message: COMMIT_MESSAGE,
				dotfiles: true,
			},
			(error) => {
				if (error == null) return;

				console.error(error);
				console.log(`${ANSI.fg.red}⚠ Failed to publish${ANSI.reset}`);
				process.exit(1);
			}
		)
		.then(() => {
			console.log(
				`${ANSI.fg.green}✓ Published site: ${
					ANSI.fg.cyan + BASE_URL + ANSI.reset
				}`
			);
		});
}

publishSite();
