import { useState } from "react";
import styles from "./Terminal.module.css";
import { useVirtualRoot } from "../../../hooks/virtual-drive/VirtualRootContext.js";
import { Command } from "../../../features/applications/terminal/commands.js";

const USERNAME = "user";
const HOSTNAME = "prozilla-os";

/**
 * @param {Object} props 
 * @param {String} props.text
 */
function OutputLine({ text }) {
	return (
		<p className={styles.Output}>{text}</p>
	);
}

/**
 * @param {Object} props 
 * @param {String} props.value
 * @param {String} props.prefix
 * @param {Function} props.onChange
 * @param {Function} props.onKeyUp
 * @param {Function} props.onKeyDown
 */
function InputLine({ value, prefix, onChange, onKeyUp, onKeyDown }) {
	return (
		<span className={styles.Input}>
			{prefix && <p className={[styles.Prefix]}>{prefix}</p>}
			<label htmlFor="input"/>
			<input
				id="input"
				value={value}
				onChange={onChange}
				onKeyUp={onKeyUp}
				onKeyDown={onKeyDown}
				spellCheck={false}
				autoComplete="off"
				autoFocus
			/>
		</span>
	);
}

export function Terminal() {
	const [inputKey, setInputKey] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [history, setHistory] = useState([]);
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate("~"));

	// console.log(currentDirectory);

	const prefix = `${USERNAME}@${HOSTNAME}:${currentDirectory.root ? "/" : currentDirectory.path}$ `;

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

	const submitInput = (value) => {
		pushHistory({
			text: prefix + value,
			isInput: true
		});

		setInputValue("");

		value = value.trim();

		if (value === "")
			return;

		const args = value.split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = Command.find(commandName);

		if (!command) {
			return promptOutput(`${commandName}: Command not found`);
		}
		
		let response = null;

		try {
			response = command.execute(args, {
				promptOutput,
				pushHistory,
				virtualRoot,
				currentDirectory,
				setCurrentDirectory,
				username: USERNAME,
				hostname: HOSTNAME,
			});

			if (response == null)
				return promptOutput(`${commandName}: Command failed`);
			
			if (!response.blank)
				promptOutput(response);
		} catch (error) {
			console.error(error);
			promptOutput(`${commandName}: Command failed`);
		}
	};

	const onKeyDown = (event) => {
		const value = event.target.value;

		// console.log(event);
		if (event.key === "Enter") {
			submitInput(value);
			setInputKey((previousKey) =>  previousKey + 1);
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
			return <OutputLine text={text} key={index}/>
		});
	};

	const onMouseDown = (event) => {
		if (event.button === 2) {
			event.preventDefault();

			navigator.clipboard.readText().then((text) => {
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
			className={styles.Terminal}
			onMouseDown={onMouseDown}
			onContextMenu={onContextMenu}
		>
			{displayHistory()}
			<InputLine
				key={inputKey}
				value={inputValue}
				prefix={prefix}
				onKeyDown={onKeyDown}
				onChange={onChange}
			/>
		</div>
	)
}