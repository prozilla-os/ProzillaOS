import Command from "../command.js";

export const pwd = new Command("pwd", (args, { currentDirectory }) => {
	if (currentDirectory.root) {
		return "/";
	} else {
		return currentDirectory.absolutePath;
	}
});