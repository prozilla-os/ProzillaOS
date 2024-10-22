import { Command, ExecuteParams } from "../command";

export const clear = new Command()
	.setManual({
		purpose: "Clear terminal screen",
	})
	.setExecute(function(_args, params) {
		const { pushHistory } = params as ExecuteParams;
		pushHistory?.({
			clear: true,
			isInput: false,
		});
	
		return { blank: true };
	});