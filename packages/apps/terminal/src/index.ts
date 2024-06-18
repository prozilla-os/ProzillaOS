import { App } from "@prozilla-os/core";
import { Terminal } from "./components/Terminal";

const terminal = new App("Terminal", "terminal", Terminal)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/terminal.svg");

export { terminal };