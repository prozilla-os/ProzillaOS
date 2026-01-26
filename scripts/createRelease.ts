import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { version, name } from "../packages/prozilla-os/package.json";
import os from "node:os";
import { ANSI } from "../packages/shared/src/constants";
import { Print } from "../packages/shared/src/features";

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
		Print.parameter("Context", name);

		const changelog = getChangelog();
		const tagName = `prozilla-os@${version}`;
		const releaseTitle = `Release ${version}`;

		// Write changelog to a temporary file
		fs.writeFileSync(changelogFilePath, changelog);

		Print.pending("Pushing tag...");
		execSync(`git push origin tag ${tagName}`, {
			stdio: "inherit"
		});

		Print.pending("Creating release...");
		execSync(`gh release create ${tagName} --title "${releaseTitle}" --notes-file "${changelogFilePath}"`, {
			stdio: "inherit"
		});

		Print.success(`Release created: ${Print.highlight(releaseTitle)}`);
	} catch (error) {
		const errorObj = error as object;
		if ("stdout" in errorObj) {
			Print.error(errorObj.stdout?.toString());
		}
		if ("stderr" in errorObj) {
			Print.error(errorObj.stderr?.toString());
		}

		Print.newLine().error(`Failed to create release: ${(error as Error).message}`);
		process.exit(1);
	} finally {
		// Clean up the temporary file
		fs.unlinkSync(changelogFilePath);
	}
};

createGitHubRelease();