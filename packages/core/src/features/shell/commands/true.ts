import { Command } from "../command";
import { EXIT_CODE } from "../../../constants";

export const trueCommand = new Command()
	.setName("true")
	.setManual({
		purpose: "Do nothing, successfully",
		usage: "true [ignored command line arguments]",
		description: "Exit with a status code indicating success.",
	})
	.setExecute(function() {
		return EXIT_CODE.success;
	});