import { App } from "@prozilla-os/core";
import { TextEditor } from "./components/TextEditor";

const textEditor = new App("Text Editor", "text-editor", TextEditor)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/text-editor.svg");

export { textEditor };