import Command from "../command.js";

export const clear = new Command("clear", (args, { pushHistory }) => {
	pushHistory({
		clear: true,
		isInput: false
	});

	return { blank: true };
});