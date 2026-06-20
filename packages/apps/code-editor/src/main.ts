import { App, AppsConfig } from "@prozilla-os/core";
import { CodeEditor } from "./components/CodeEditor";

const codeEditor = new App("Code Editor", "code-editor", CodeEditor)
	.setIconUrl("https://os.prozilla.dev/assets/apps/icons/code-editor.svg")
	.setRole(AppsConfig.APP_ROLES.textEditor)
	.setCategory("Utilities & tools");

export { codeEditor };