import { App, AppsConfig } from "@prozilla-os/core";
import { Terminal, TerminalProps } from "./components/Terminal";

const repoSweeper = new App<TerminalProps>(
	"GitHub Repo Sweeper",
	"gh-repo-sweeper",
	Terminal
)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/terminal.svg")
	.setRole(AppsConfig.APP_ROLES.custom)
	.setCategory("Utilities & tools");

export { repoSweeper };

