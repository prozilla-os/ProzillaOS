import Command from "../command.js";

export const pwd = new Command("pwd")
	.setManual({
		purpose: "Display path of the current directory"
	})
	.setExecute((args, { currentDirectory }) => {
		if (currentDirectory.root) {
			return "/";
		} else {
			return currentDirectory.absolutePath;
		}
	});