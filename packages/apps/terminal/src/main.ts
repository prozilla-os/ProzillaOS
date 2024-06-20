import { App } from "@prozilla-os/core";
import { Terminal, TerminalProps } from "./components/Terminal";

const terminal = new App<TerminalProps>("Terminal", "terminal", Terminal)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/terminal.svg");

export { terminal };