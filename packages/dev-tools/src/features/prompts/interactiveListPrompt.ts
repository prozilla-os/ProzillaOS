import { createPrompt, useState, useKeypress, usePrefix, isEnterKey, isUpKey, isDownKey } from "@inquirer/core";
import { ANSI, Ansi } from "@prozilla-os/shared";

/**
 * Represents a choice in an {@link interactiveListPrompt}.
 */
export interface InteractiveListChoice {
	/** The name to display in the list. */
	name: string;
	/** The value to return if this is submitted. */
	value: string;
	/** The keyboard shortcut that submits this choice. */
	key: string;
}

/**
 * Configuration for {@link interactiveListPrompt}.
 */
export interface InteractiveListConfig {
	/** The message to display at the top of the list. */
	message: string;
	/** The list of choices. */
	choices: Array<InteractiveListChoice>;
	/** The default value to select. Defaults to the first choice. A value of `null` represents no selection. */
	default?: string | null;
	/** Function that renders the selected choice. */
	renderSelected?: (choice: InteractiveListChoice, index: number) => string;
	/** Functions that renders the unselected choices. */
	renderUnselected?: (choice: InteractiveListChoice, index: number) => string;
	/** 
	 * Whether to hide the cursor during selection.
	 * @default true
	 */
	hideCursor?: boolean;
	/**
	 * Whether to horizontally align the shortcuts in the list of choices.
	 * @default false
	 */
	alignShortcuts?: boolean;
}

/**
 * Creates an interactive list of choices that supports selection via arrow keys + enter or via pressing a key associated with a choice.
 * 
 * This is based on {@link https://github.com/pgibler/inquirer-interactive-list-prompt pgibler/inquirer-interactive-list-prompt}.
 * @example
 * ```ts
 * const answer = await interactiveListPrompt({
 *   message: "Select an option:",
 *   choices: [
 *     { name: "Option A", value: "A", key: "a" },
 *     { name: "Option B", value: "B", key: "b" },
 *     { name: "Option C", value: "C", key: "c" },
 *   ],
 * });
 * ```
 */
export const interactiveListPrompt = async (config: InteractiveListConfig) => {
	const renderKey = ({ key }: InteractiveListChoice) => Ansi.dim(`(${Ansi.bold(key)})`);
	const {
		renderSelected = (choice: InteractiveListChoice) => Ansi.yellow(`❯ ${renderKey(choice)} ${choice.name}`),
		renderUnselected = (choice: InteractiveListChoice) => `  ${renderKey(choice)} ${choice.name}`,
	} = config;

	return await createPrompt<string, InteractiveListConfig>((config, done) => {
		const { choices, default: defaultValue, hideCursor = true, alignShortcuts = false } = config;
		const [status, setStatus] = useState<"pending" | "done">("pending");
		const [index, setIndex] = useState(defaultValue === null ? -1 : defaultValue === undefined ? 0 : choices.findIndex((choice) => choice.value === defaultValue));
		const prefix = usePrefix({});

		if (alignShortcuts) {
			let maxChoiceNameLength = 0;
			for (const choice of choices) {
				maxChoiceNameLength = Math.max(maxChoiceNameLength, choice.name.length);
			}
			for (const choice of choices) {
				choice.name = choice.name + " ".repeat(maxChoiceNameLength - choice.name.length);
			}
		}

		useKeypress((key, _rl) => {
			if (isEnterKey(key)) {
				const selectedChoice = choices[index];
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (selectedChoice) {
					setStatus("done");
					done(selectedChoice.value);
				}
			} else if (isUpKey(key)) {
				setIndex((index + choices.length - 1) % choices.length);
			} else if (isDownKey(key)) {
				setIndex((index + 1) % choices.length);
			} else {
				const foundIndex = choices.findIndex((choice) => choice.key.toLowerCase() === key.name.toLowerCase());
				if (foundIndex !== -1) {
					setIndex(foundIndex);
					setStatus("done");
					done(choices[foundIndex]?.value ?? "");
				}
			}
		});

		let message = Ansi.bold(config.message);

		if (status === "done")
			return `${prefix} ${message} ${Ansi.cyan(choices[index]?.name ?? "")}`;

		if (hideCursor)
			message += ANSI.cursor.hide;

		const renderedChoices = choices
			.map((choice, i) => i === index ? renderSelected(choice, index) : renderUnselected(choice, i))
			.join("\n");

		return [`${prefix} ${message}`, renderedChoices];
	})(config);
};