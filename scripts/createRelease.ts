import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { version, name } from "../packages/prozilla-os/package.json";
import os from "node:os";
import { ANSI } from "../packages/core/src/constants";

const getChangelog = (): string => {
	const changelogPath = path.resolve(__dirname, "../packages/prozilla-os/CHANGELOG.md");
	const changelog = fs.readFileSync(changelogPath, "utf-8");

	const changelogEntries = changelog.split("\n## ");

	const changelogEntry = changelogEntries.find((entry) => entry.startsWith(version));

	if (changelogEntry) {
		return changelogEntry;
	} else {
		return `No changelog entry found for version ${version}`;
	}
};

const createGitHubRelease = (): void => {
	const changelogFilePath = path.join(os.tmpdir(), `CHANGELOG-${version}.md`);

	try {
		console.log(`Context: ${ANSI.decoration.bold}${name}${ANSI.reset}\n`);

		const changelog = getChangelog();
		const tagName = `prozilla-os@${version}`;
		const releaseTitle = `Release ${version}`;

		// Write changelog to a temporary file
		fs.writeFileSync(changelogFilePath, changelog);

		console.log(`${ANSI.fg.yellow}Pushing tag...${ANSI.reset}`);
		execSync(`git push origin tag ${tagName}`, {
			stdio: "inherit"
		});

		console.log(`${ANSI.fg.yellow}Creating release...${ANSI.reset}`);
		execSync(`gh release create ${tagName} --title "${releaseTitle}" --notes-file "${changelogFilePath}"`, {
			stdio: "inherit"
		});

		console.log(`\n${ANSI.fg.green}✓ Release created: ${ANSI.fg.cyan + releaseTitle + ANSI.reset}`);
	} catch (error) {
		if ((error as Record<string, string>).stdout) {
			console.error((error as Record<string, string>).stdout.toString());
		}
		if ((error as Record<string, string>).stderr) {
			console.error((error as Record<string, string>).stderr.toString());
		}

		console.error(`\n${ANSI.fg.red}⚠ Failed to create release: ${(error as Error).message}${ANSI.reset}`);
		process.exit(1);
	} finally {
		// Clean up the temporary file
		fs.unlinkSync(changelogFilePath);
	}
};

createGitHubRelease();