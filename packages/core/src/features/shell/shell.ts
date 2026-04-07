import { proxy, ref } from "valtio";
import { Stream } from "./stream";
import { CommandResponse } from "./command";
import { formatError } from "./_utils/shell.utils";
import { CommandsManager } from "./commands";
import { Ansi, ANSI, clamp, removeFromArray, Vector2 } from "@prozilla-os/shared";
import { HOSTNAME, USERNAME, WELCOME_MESSAGE } from "../../constants/shell.const";
import { App } from "../apps/app";
import { VirtualFolder, VirtualRoot } from "../virtual-drive";
import { SettingsManager } from "../settings/settingsManager";
import { SystemManager } from "../system/systemManager";

export interface HistoryEntry {
	text?: string;
	isInput: boolean;
	value?: string;
	clear?: boolean;
}

export interface ShellConfig {
    app?: App;
    path?: string;
    input?: string;
    virtualRoot: VirtualRoot;
    systemManager: SystemManager;
    settingsManager: SettingsManager;
    exit: () => void;
    sizeRef: { current: Vector2 };
}

export interface ShellState {
	history: HistoryEntry[];
	inputValue: string;
	historyIndex: number;
	stream: Stream | null;
	streamOutput: string | null;
	currentDirectory: VirtualFolder;
	prefix: string;
}

export class Shell {
	state: ShellState;
	config: ShellConfig;

	constructor(config: ShellConfig) {
		this.config = config;
		this.state = proxy<ShellState>({
			history: [{
				text: config.app ? WELCOME_MESSAGE.replace("$APP_NAME", config.app.name) : WELCOME_MESSAGE,
				isInput: false,
			}],
			inputValue: config.input ?? "",
			historyIndex: 0,
			stream: null,
			streamOutput: null,
			currentDirectory: config.virtualRoot.navigate(config.path ?? "~") as VirtualFolder,
			prefix: "",
		});
		this.updatePrefix();
	}

	private updatePrefix() {
		this.state.prefix = Ansi.cyan(`${USERNAME}@${HOSTNAME}`) + ":"
            + Ansi.blue(`${this.state.currentDirectory.root ? "/" : this.state.currentDirectory.path}`) + "$ ";
	}

	public setInputValue(value: string | ((prev: string) => string)) {
		if (typeof value === "function") {
			this.state.inputValue = value(this.state.inputValue);
		} else {
			this.state.inputValue = value;
		}
	}

	public pushHistory(entry: HistoryEntry) {
		this.state.history.push(entry);
	}

	public promptOutput(text: string) {
		this.pushHistory({ text, isInput: false });
	}

	public connectStream(stream: Stream, pipes: string[]) {
		this.state.stream = ref(stream);

		const onKeyDown = (event: globalThis.KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === "c") {
				stream.stop();
			}
		};

		let lastOutput: CommandResponse | null = null;

		stream.onAsync(Stream.SEND_EVENT, async (text: string) => {
			let output: CommandResponse = text;

			for (const pipe of pipes) {
				if (output instanceof Stream) continue;
				output = await this.handleInput(output ? `${pipe} ${output as string}` : pipe);
			}

			if (output instanceof Stream) {
				stream.stop();
				this.promptOutput(ANSI.fg.red + "Stream failed");
				return;
			}

			lastOutput = output;
			this.state.streamOutput = output as string;
		});

		stream.on(Stream.STOP_EVENT, () => {
			document.removeEventListener("keydown", onKeyDown);
			this.promptOutput(lastOutput as string);
			this.state.stream = null;
			this.state.streamOutput = null;
		});

		document.addEventListener("keydown", onKeyDown);
	}

	public async handleInput(value: string): Promise<CommandResponse> {
		const rawInputValueStart = value.indexOf(" ") + 1;
		const rawInputValue = rawInputValueStart <= 0 ? "" : value.substr(rawInputValueStart);
		const timestamp = Date.now();

		value = value.trim();
		if (value === "") return;

		let args: string[] | null = value.match(/(?:[^\s"]+|"[^"]*")+/g);
		if (args == null) return;
		if (args[0].toLowerCase() === "sudo" && args.length >= 2) args.shift();

		const commandName = args.shift()?.toLowerCase();
		if (commandName == null) return;
		const command = CommandsManager.find(commandName);

		if (!command) return formatError(commandName, "Command not found");

		args = args.map((arg) => {
			if (arg.startsWith("\"") && arg.endsWith("\"")) return arg.slice(1, -1);
			return arg;
		});

		const options: string[] = [];
		const inputs: Record<string, string> = {};
		args.filter((arg: string) => arg.startsWith("-")).forEach((option: string) => {
			const addOption = (key: string) => {
				const commandOption = command.getOption(key);
				key = commandOption?.short ?? key;

				if (options.includes(key)) return;

				options.push(key);

				if (commandOption?.isInput) {
					const optionInput = args[args.indexOf(option) + 1];
					inputs[commandOption.short] = optionInput;
					removeFromArray(optionInput, args);
				}
			};

			if (option.startsWith("--")) {
				const longOption = option.substring(2).toLowerCase();
				addOption(longOption);
			} else {
				const shortOptions = option.substring(1).split("");
				shortOptions.forEach((shortOption: string) => {
					addOption(shortOption);
				});
			}
            
			removeFromArray(option, args);
		});

		if (command.requireArgs && args.length === 0)
			return formatError(commandName, `Incorrect usage: ${commandName} requires at least 1 argument`);

		if (command.requireOptions && options.length === 0)
			return formatError(commandName, `Incorrect usage: ${commandName} requires at least 1 option`);
        
		let response: CommandResponse | null = null;

		try {
			response = await command.execute(args, {
				promptOutput: this.promptOutput.bind(this),
				pushHistory: this.pushHistory.bind(this),
				execute: this.handleInput.bind(this),
				virtualRoot: this.config.virtualRoot,
				currentDirectory: this.state.currentDirectory,
				setCurrentDirectory: (dir: VirtualFolder) => {
					this.state.currentDirectory = dir;
					this.updatePrefix();
				},
				username: USERNAME,
				hostname: HOSTNAME,
				rawInputValue,
				options,
				exit: this.config.exit,
				inputs,
				timestamp,
				settingsManager: this.config.settingsManager,
				systemManager: this.config.systemManager,
				app: this.config.app!,
				size: this.config.sizeRef.current,
			});

			if (response == null) return formatError(commandName, "Command failed");
			if (!(response as { blank: boolean }).blank) return response;
		} catch (error) {
			console.error(error);
			return formatError(commandName, "Command failed");
		}
	}

	public resetInput() {
		this.state.inputValue = "";
		this.state.historyIndex = 0;
	}

	public async submitInput(value: string) {
		this.pushHistory({
			text: this.state.prefix + value,
			isInput: true,
			value,
		});

		let pipes = value.split(" | ");
		const completedPipes: string[] = [];

		let output: CommandResponse | null = null;
		for (const pipe of pipes) {
			if (output instanceof Stream) continue;
			output = await this.handleInput(output ? `${pipe} ${output as string}` : pipe);
			completedPipes.push(pipe);
		}

		this.resetInput();

		pipes = pipes.filter((pipe) => !completedPipes.includes(pipe));

		if (output) {
			if (output instanceof Stream) {
				this.connectStream(output, pipes);
			} else {
				this.promptOutput(`${output as string}\n`);
			}
		}
	}

	public updateHistoryIndex(delta: number) {
		const inputHistory = this.state.history.filter(({ isInput }) => isInput);
		const index = clamp(this.state.historyIndex + delta, 0, inputHistory.length);

		if (index === this.state.historyIndex) {
			if (delta < 0) this.state.inputValue = "";
			return;
		}

		if (index === 0) {
			this.state.inputValue = "";
		} else {
			this.state.inputValue = inputHistory[inputHistory.length - index].value ?? "";
		}

		this.state.historyIndex = index;
	}
}