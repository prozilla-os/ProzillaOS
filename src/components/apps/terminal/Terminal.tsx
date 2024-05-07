import { useEffect, useRef, useState } from "react";
import styles from "./Terminal.module.css";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext";
import { clamp } from "../../../features/math/clamp";
import { OutputLine } from "./OutputLine";
import { InputLine } from "./InputLine";
import { ANSI, HOSTNAME, USERNAME } from "../../../config/apps/terminal.config";
import CommandsManager from "../../../features/apps/terminal/commands";
import { removeFromArray } from "../../../features/_utils/array.utils";
import Stream from "../../../features/apps/terminal/stream";
import { formatError } from "../../../features/apps/terminal/_utils/terminal.utils";
import { WindowProps } from "../../windows/WindowView";
import { VirtualFolder } from "../../../features/virtual-drive/folder/virtualFolder";

interface TerminalProps extends WindowProps {
	startPath: string;
	input: string;
}

export function Terminal({ startPath, input, setTitle, close: exit, active }: TerminalProps) {
	const [inputKey, setInputKey] = useState(0);
	const [inputValue, setInputValue] = useState(input ?? "");
	const [history, setHistory] = useState([]);
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate(startPath ?? "~"));
	const inputRef = useRef(null);
	const [historyIndex, setHistoryIndex] = useState(0);
	const [stream, setStream] = useState(null);
	const [streamOutput, setStreamOutput] = useState(null);
	const streamRef = useRef(null);
	const [streamFocused, setStreamFocused] = useState(false);

	useEffect(() => {
		setTitle(`${USERNAME}@${HOSTNAME}: ${currentDirectory.root ? "/" : currentDirectory.path}`);
	}, [currentDirectory.path, currentDirectory.root, setTitle]);

	useEffect(() => {
		if (streamFocused || streamRef.current == null || streamOutput == null)
			return;

		streamRef.current.scrollTop = streamRef.current.scrollHeight;
		setStreamFocused(true);
	}, [streamFocused, streamOutput, streamRef]);

	useEffect(() => {
		if (!inputRef.current || !active)
			return;

		inputRef.current.focus();
	}, [inputRef, active]);

	const prefix = `${ANSI.fg.cyan + USERNAME}@${HOSTNAME + ANSI.reset}:`
		+ `${ANSI.fg.blue + (currentDirectory.root ? "/" : currentDirectory.path) + ANSI.reset}$ `;

	const updatedHistory = history;
	const pushHistory = (entry) => {
		updatedHistory.push(entry);
		setHistory(updatedHistory);
	};

	const promptOutput = (text) => {
		pushHistory({
			text,
			isInput: false
		});
	};

	const connectStream = (stream, pipes) => {
		setStream(stream);
		setStreamFocused(false);

		const onKeyDown = (event) => {
			if (active && (event.ctrlKey || event.metaKey) && event.key === "c") {
				stream.stop();
			}
		};

		let lastOutput = null;

		stream.on(Stream.EVENT_NAMES.new, (text) => {
			let output = text;
			pipes.forEach((pipe) => {
				if (output instanceof Stream)
					return;
	
				// Output from the previous command gets added as an argument for the next command
				output = handleInput(output ? `${pipe} ${output}` : pipe);
			});

			if (output instanceof Stream) {
				stream.stop();
				promptOutput(ANSI.fg.red + "Stream failed");
				return;
			}

			lastOutput = output;
			setStreamOutput(output);
		});

		stream.on(Stream.EVENT_NAMES.stop, () => {
			document.removeEventListener("keydown", onKeyDown);

			promptOutput(lastOutput);

			setStream(null);
			setStreamOutput(null);
		});
		
		document.addEventListener("keydown", onKeyDown);
	};

	const handleInput = (value) => {
		const rawInputValueStart = value.indexOf(" ") + 1;
		const rawInputValue = rawInputValueStart <= 0 ? "" : value.substr(rawInputValueStart);
		const timestamp = Date.now();
		value = value.trim();

		if (value === "")
			return;

		// Get arguments
		const args = value.match(/(?:[^\s"]+|"[^"]*")+/g);

		if (args[0].toLowerCase() === "sudo" && args.length > 1) {
			args.shift();
		}

		// Get command
		const commandName = args.shift().toLowerCase();
		const command = CommandsManager.find(commandName);

		if (!command)
			return formatError(commandName, "Command not found");

		// Get options
		const options = [];
		const inputs = {};
		args.filter((arg) => arg.startsWith("-")).forEach((option, index) => {
			const addOption = (key) => {
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
				shortOptions.forEach((shortOption) => {
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
		let response = null;

		try {
			response = command.execute(args, {
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
				timestamp
			});

			if (response == null)
				return formatError(commandName, "Command failed");
			
			if (!response.blank)
				return response;
		} catch (error) {
			console.error(error);
			return formatError(commandName, "Command failed");
		}
	};

	const submitInput = (value) => {
		pushHistory({
			text: prefix + value,
			isInput: true,
			value
		});

		setInputValue("");
		setHistoryIndex(0);

		// Piping is used to chain commands
		let pipes = value.split(" | ");
		const completedPipes = [];

		let output = null;
		pipes.forEach((pipe) => {
			if (output instanceof Stream)
				return;

			// Output from the previous command gets added as an argument for the next command
			output = handleInput(output ? `${pipe} ${output}` : pipe);
			completedPipes.push(pipe);
		});

		pipes = pipes.filter((pipe) => !completedPipes.includes(pipe));

		if (output) {
			if (output instanceof Stream) {
				connectStream(output, pipes);
			} else {
				promptOutput(`${output}\n`);
			}
		}
	};

	const updateHistoryIndex = (delta) => {
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
			setInputValue(inputHistory[inputHistory.length - index].value);
		}

		setHistoryIndex(index);
	};

	const onKeyDown = (event) => {
		const value = event.target.value;
		const { key } = event;

		if (key === "Enter") {
			submitInput(value);
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

	const onChange = (event) => {
		const value = event.target.value;
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

	const onMouseDown = (event) => {
		if (event.button === 2) {
			event.preventDefault();

			navigator.clipboard.readText?.().then((text) => {
				setInputValue(inputValue + text);
			}).catch((error) => {
				console.error(error);
			});
		}
	};

	const onContextMenu = (event) => {
		event.preventDefault();
	};

	return (
		<div
			ref={streamRef} 
			className={styles.Terminal}
			onMouseDown={onMouseDown}
			onContextMenu={onContextMenu}
			onClick={(event) => {
				if (window.getSelection().toString() === "") {
					event.preventDefault();
					inputRef.current?.focus();
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
					inputRef={inputRef}
				/>
				: <OutputLine text={streamOutput ?? ""}/>
			}
		</div>
	);
}