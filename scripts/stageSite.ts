import { ANSI } from "../packages/shared/src/constants";
import { name } from "../package.json";
import fs from "node:fs";
import { BUILD_DIR } from "../demo/src/config/deploy.config";
import { resolve } from "node:path";

const EXAMPLES = ["portfolio"];

const PACKAGES = [
  { source: `../${BUILD_DIR}`, destination: "/" },
  { source: `../docs/${BUILD_DIR}`, destination: "/docs" },
  ...EXAMPLES.map((folder) => {
    return {
      source: `../examples/${folder}/${BUILD_DIR}`,
      destination: `/examples/${folder}`,
    };
  }),
];

const TARGET = `../${BUILD_DIR}`;

function stageSite() {
  try {
    console.log(`Context: ${ANSI.decoration.bold}${name}${ANSI.reset}\n`);
    console.log(`${ANSI.fg.yellow}Staging site...${ANSI.reset}`);

    // Copy packages to build directory
    PACKAGES.forEach(({ source, destination }) => {
      const sourceDirectory = resolve(__dirname, source);
      const targetDirectory = resolve(
        __dirname,
        TARGET,
        destination.replace(/^\//, "")
      );

      if (!fs.existsSync(sourceDirectory)) {
        console.warn(`Directory not found: ${source}`);
        return;
      }

      if (!fs.existsSync(targetDirectory))
        fs.mkdirSync(targetDirectory, { recursive: true });

      fs.cpSync(sourceDirectory, targetDirectory, { recursive: true });
      console.log(
        `- Copied ${
          ANSI.fg.cyan + source.replace(/^\.\.\//, "") + ANSI.reset
        } to ${ANSI.fg.cyan + destination + ANSI.reset}`
      );
    });

    // Copy git attributes to build directory
    const gitAttributesDirectory = resolve(__dirname, "../.gitattributes");
    if (fs.existsSync(gitAttributesDirectory)) {
      fs.copyFileSync(
        gitAttributesDirectory,
        resolve(__dirname, `../${BUILD_DIR}/.gitattributes`)
      );
      console.log(`- Copied ${ANSI.fg.cyan + ".gitattributes" + ANSI.reset}`);
    }

    console.log(
      `\n${ANSI.fg.green}✓ Site staged: ${ANSI.fg.cyan}./${
        BUILD_DIR + ANSI.reset
      }`
    );
  } catch (error) {
    if ((error as Record<string, string>).stdout) {
      console.error((error as Record<string, string>).stdout.toString());
    }
    if ((error as Record<string, string>).stderr) {
      console.error((error as Record<string, string>).stderr.toString());
    }

    console.error(error);
    console.log(`${ANSI.fg.red}⚠ Staging failed${ANSI.reset}`);
    process.exit(1);
  }
}

stageSite();
