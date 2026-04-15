import { Command } from "../command";
import { EXIT_CODE } from "../../../constants";

export const falseCommand = new Command()
	.setName("false")
	.setManual({
		purpose: "Do nothing, unsuccessfully",
		usage: "false [ignored command line arguments]",
		description: "Exit with a status code indicating failure.",
	})
	.setExecute(function() {
		return EXIT_CODE.generalError;
	});