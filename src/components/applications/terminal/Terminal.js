import { useState } from "react";
import styles from "./Terminal.module.css";
import { Command } from "./commands.js";
import { useVirtualRoot } from "../../../hooks/VirtualRootContext.js";

function OutputLine({ text }) {
	return (
		<p className={styles.Output}>{text}</p>
	);
}

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
				autoComplete={null}
				autoFocus
			/>
		</span>
	);
}

export function Terminal() {
	const [inputValue, setInputValue] = useState("");
	const [history, setHistory] = useState([]);
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot);

	const prefix = `user@prozilla-os:${currentDirectory.formattedPath}$ `;

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
		// To do: make empty submit go to new line
		if (value.trim() === "")
			return;

		pushHistory({
			text: prefix + value,
			isInput: true
		});

		setInputValue("");

		value = value.trim();

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
				setCurrentDirectory
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
	}

	return (
		<div className={styles.Terminal}>
			{displayHistory()}
			<InputLine
				value={inputValue}
				prefix={prefix}
				onKeyDown={onKeyDown}
				onChange={onChange}
			/>
		</div>
	)
}