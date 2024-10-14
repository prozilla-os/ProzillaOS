/** Output folder for the website build */
export const BUILD_DIR = "dist";

/** Domain to deploy the website to */
export const DOMAIN = "os.prozilla.dev";
/** Base URL of the website, that consists of the http protocol and the domain */
export const BASE_URL = `https://${DOMAIN}/`;

/** Properties of the GitHub repository with the source code of the website */
export const REPO = { owner: "prozilla-os", name: "ProzillaOS", branch: "main" };
/** URL of the GitHub repository with the source code of the website */
export const REPO_URL = `https://github.com/${REPO.owner}/${REPO.name}`;

/** Commit message for GitHub Pages deployments */
export const COMMIT_MESSAGE = "Deployed build to GitHub Pages";