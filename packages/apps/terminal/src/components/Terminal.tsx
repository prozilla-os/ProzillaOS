import { MouseEventHandler, MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./Terminal.module.css";
import { OutputLine } from "./OutputLine";
import { InputLine } from "./InputLine";
import { App, SettingsManager, useSettingsManager, useSystemManager, useVirtualRoot, VirtualFolder, WindowProps } from "@prozilla-os/core";
import { HOSTNAME, USERNAME, WELCOME_MESSAGE } from "../constants/terminal.const";
import { Stream } from "../core/stream";
import { CommandResponse } from "../core/command";
import { formatError } from "../core/_utils/terminal.utils";
import { CommandsManager } from "../core/commands";
import { ANSI, clamp, removeFromArray } from "@prozilla-os/shared";

export interface TerminalProps extends WindowProps {
	path?: string;
	input?: string;
}

interface HistoryEntry {
	text: string;
	isInput: boolean;
	value?: string;
	clear?: boolean;
}

export function Terminal({ app, path: startPath, input, setTitle, close: exit, active, focus }: TerminalProps) {
	const systemManager = useSystemManager();
	const [inputKey, setInputKey] = useState(0);
	const [inputValue, setInputValue] = useState(input ?? "");
	const [history, setHistory] = useState<HistoryEntry[]>([{
		text: app ? WELCOME_MESSAGE.replace("$APP_NAME", app.name) : WELCOME_MESSAGE,
		isInput: false,
	}]);
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot?.navigate(startPath ?? "~"));
	const inputRef = useRef(null);
	const [historyIndex, setHistoryIndex] = useState(0);
	const [stream, setStream] = useState<Stream | null>(null);
	const [streamOutput, setStreamOutput] = useState<string | null>(null);
	const ref = useRef(null);
	const [streamFocused, setStreamFocused] = useState(false);
	const settingsManager = useSettingsManager();

	useEffect(() => {
		if (currentDirectory != null)
			setTitle?.(`${USERNAME}@${HOSTNAME}: ${currentDirectory.root ? "/" : currentDirectory.path}`);
	}, [currentDirectory?.path, currentDirectory?.root, setTitle]);

	useEffect(() => {
		if (!inputRef.current || !active)
			return;

		(inputRef.current as unknown as HTMLInputElement).focus();
	}, [inputRef, active]);

	const scrollDown = () => {
		(ref.current as unknown as HTMLDivElement).scrollTop = (ref.current as unknown as HTMLDivElement).scrollHeight;
	};

	useEffect(() => {
		if (streamFocused || ref.current == null || streamOutput == null)
			return;

		scrollDown();
		setStreamFocused(true);
	}, [streamFocused, streamOutput, ref]);

	useEffect(() => {
		if (ref.current == null || stream != null)
			return;

		scrollDown();
	}, [inputValue]);

	const prefix = `${ANSI.fg.cyan + USERNAME}@${HOSTNAME + ANSI.reset}:`
		+ `${ANSI.fg.blue + ((currentDirectory?.root || currentDirectory == null) ? "/" : currentDirectory?.path) + ANSI.reset}$ `;

	const updatedHistory = history;
	const pushHistory = (entry: HistoryEntry) => {
		updatedHistory.push(entry);
		setHistory(updatedHistory);
	};

	const promptOutput = (text: string) => {
		pushHistory({
			text,
			isInput: false
		});
	};

	const connectStream = (stream: Stream, pipes: string[]) => {
		setStream(stream);
		setStreamFocused(false);

		const onKeyDown = (event: KeyboardEvent) => {
			if (active && (event.ctrlKey || event.metaKey) && event.key === "c") {
				stream.stop();
			}
		};

		let lastOutput: CommandResponse | null = null;

		stream.on(Stream.EVENT_NAMES.new, (text) => {
			void (async () => {
				let output: CommandResponse = text as CommandResponse;

				for (const pipe of pipes) {
					if (output instanceof Stream)
						continue;
		
					// Output from the previous command gets added as an argument for the next command
					output = await handleInput(output ? `${pipe} ${output as string}` : pipe);
				}

				if ((output as unknown) instanceof Stream) {
					stream.stop();
					promptOutput(ANSI.fg.red + "Stream failed");
					return;
				}

				lastOutput = output;
				setStreamOutput(output as string);
			})();
		});

		stream.on(Stream.EVENT_NAMES.stop, () => {
			document.removeEventListener("keydown", onKeyDown);

			promptOutput(lastOutput as string);

			setStream(null);
			setStreamOutput(null);
		});
		
		document.addEventListener("keydown", onKeyDown);
	};

	const handleInput = async (value: string): Promise<CommandResponse> => {
		const rawInputValueStart = value.indexOf(" ") + 1;
		const rawInputValue = rawInputValueStart <= 0 ? "" : value.substr(rawInputValueStart);
		const timestamp = Date.now();

		value = value.trim();
		if (value === "") return;

		// Parse arguments
		let args: string[] | null = value.match(/(?:[^\s"]+|"[^"]*")+/g);
		if (args == null) return;
		if (args[0].toLowerCase() === "sudo" && args.length >= 2) args.shift();

		// Get command
		const commandName = args.shift()?.toLowerCase();
		if (commandName == null) return;
		const command = CommandsManager.find(commandName);

		if (!command) return formatError(commandName, "Command not found");

		args = args.map((arg) => {
			if (arg.startsWith("\"") && arg.endsWith("\""))
				return arg.slice(1, -1);

			return arg;
		});

		// Get options
		const options: string[] = [];
		const inputs: Record<string, string> = {};
		args.filter((arg: string) => arg.startsWith("-")).forEach((option: string) => {
			const addOption = (key: string) => {
				if (options.includes(key))
					return;

				options.push(key);
				const commandOption = command.getOption(options[options.length - 1]);

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

		// Check usage
		if (command.requireArgs && args.length === 0)
			return formatError(commandName, `Incorrect usage: ${commandName} requires at least 1 argument`);

		if (command.requireOptions && options.length === 0)
			return formatError(commandName, `Incorrect usage: ${commandName} requires at least 1 option`);
		
		// Execute command
		let response: CommandResponse | null = null;

		try {
			response = await command.execute(args, {
				promptOutput,
				pushHistory,
				virtualRoot,
				currentDirectory: currentDirectory as VirtualFolder,
				setCurrentDirectory,
				username: USERNAME,
				hostname: HOSTNAME,
				rawInputValue,
				options,
				exit,
				inputs,
				timestamp,
				settingsManager: settingsManager as SettingsManager,
				systemManager,
				app: app as App,
			});

			if (response == null)
				return formatError(commandName, "Command failed");
			
			if (!(response as { blank: boolean }).blank)
				return response;
		} catch (error) {
			console.error(error);
			return formatError(commandName, "Command failed");
		}
	};

	const resetInput = () => {
		setInputValue("");
		setHistoryIndex(0);
	};

	const submitInput = async (value: string) => {
		pushHistory({
			text: prefix + value,
			isInput: true,
			value
		});

		// Piping is used to chain commands
		let pipes = value.split(" | ");
		const completedPipes: string[] = [];

		let output: CommandResponse | null = null;
		for (const pipe of pipes) {
			if (output instanceof Stream)
				continue;

			// Output from the previous command gets added as an argument for the next command
			output = await handleInput(output ? `${pipe} ${output as string}` : pipe);
			completedPipes.push(pipe);
		}

		resetInput();

		pipes = pipes.filter((pipe) => !completedPipes.includes(pipe));

		if (output) {
			if (output instanceof Stream) {
				connectStream(output, pipes);
			} else {
				promptOutput(`${output as string}\n`);
			}
		}
	};

	const updateHistoryIndex = (delta: number) => {
		const inputHistory = history.filter(({ isInput }) => isInput);
		const index = clamp(historyIndex + delta, 0, inputHistory.length);

		if (index === historyIndex) {
			if (delta < 0) {
				setInputValue("");
			}

			return;
		}

		if (index === 0) {
			setInputValue("");
		} else {
			setInputValue(inputHistory[inputHistory.length - index].value ?? "");
		}

		setHistoryIndex(index);
	};

	const onKeyDown = (event: KeyboardEvent) => {
		const value = (event.target as HTMLInputElement).value;
		const { key } = event;

		if (key === "Enter") {
			void submitInput(value);
			setInputKey((previousKey) =>  previousKey + 1);
		} else if (key === "ArrowUp") {
			event.preventDefault();
			updateHistoryIndex(1);
		} else if (key === "ArrowDown") {
			event.preventDefault();
			updateHistoryIndex(-1);
		} else if (!stream && (event.ctrlKey || event.metaKey) && key === "c") {
			setInputValue((value) => value + "^C");
		}
	};

	const onChange = (event: KeyboardEvent) => {
		const value = (event.target as HTMLInputElement).value;
		return setInputValue(value);
	};

	const displayHistory = () => {
		const visibleHistory = history.slice(-16);
		let startIndex = 0;

		visibleHistory.forEach((entry, index) => {
			if (entry.clear)
				startIndex = index + 1;
		});

		return visibleHistory.slice(startIndex).map(({ text }, index) => {
			return <OutputLine text={text} key={index}/>;
		});
	};

	const onMouseDown = (event: MouseEvent) => {
		focus?.(event);

		if (event.button === 2) {
			event.preventDefault();

			navigator.clipboard.readText?.().then((text) => {
				setInputValue(inputValue + text);
			}).catch((error) => {
				console.error(error);
			});
		}
	};

	const onContextMenu = (event: Event) => {
		event.preventDefault();
	};

	return (
		<div
			ref={ref} 
			className={styles.Terminal}
			onMouseDown={onMouseDown as unknown as MouseEventHandler}
			onContextMenu={onContextMenu as unknown as MouseEventHandler}
			onClick={(event) => {
				if (window.getSelection()?.toString() === "") {
					event.preventDefault();
					(inputRef.current as HTMLInputElement | null)?.focus();
				}
			}}
		>
			{displayHistory()}
			{!stream
				? <InputLine
					key={inputKey}
					value={inputValue}
					prefix={prefix}
					onKeyDown={onKeyDown}
					onChange={onChange}
					inputRef={inputRef as unknown as MutableRefObject<HTMLInputElement>}
				/>
				: <OutputLine text={streamOutput ?? ""}/>
			}
		</div>
	);
}