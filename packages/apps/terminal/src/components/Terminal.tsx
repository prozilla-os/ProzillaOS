import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./Terminal.module.css";
import { OutputLine } from "./OutputLine";
import { InputLine } from "./InputLine";
import { HOSTNAME, USERNAME, useShell, WindowProps } from "@prozilla-os/core";
import { Vector2 } from "@prozilla-os/shared";

export interface TerminalProps extends WindowProps {
	path?: string;
	input?: string;
}

export function Terminal({ app, path: startPath, input, setTitle, close: exit, active, focus }: TerminalProps) {
	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const sizeRef = useRef(Vector2.ZERO);
	const [inputKey, setInputKey] = useState(0);
	const [shell, state] = useShell({
		app,
		path: startPath,
		input,
		exit: exit!,
		sizeRef,
	});

	useEffect(() => {
		setTitle?.(`${USERNAME}@${HOSTNAME}: ${state.workingDirectory.root ? "/" : state.workingDirectory.path}`);
	}, [state.workingDirectory.path, state.workingDirectory.root, setTitle]);

	// Handle initial focus and focus recovery after streaming
	useEffect(() => {
		if (!active) return;

		if (state.stream) {
			ref.current?.focus();
		} else {
			inputRef.current?.focus();
		}
	}, [active, state.stream]);

	const scrollDown = () => {
		if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
	};

	useEffect(() => {
		scrollDown();
	}, [state.history.length, state.inputValue, state.ttyBuffer]);

	useEffect(() => {
		if (!ref.current) return;

		const measure = () => {
			if (!ref.current) return;

			const style = getComputedStyle(ref.current);
			const fontSize = parseFloat(style.fontSize);
			const charWidth = 0.585 * fontSize;
			const charHeight = 1.25 * fontSize;
			const { width, height } = ref.current.getBoundingClientRect();

			sizeRef.current.set(
				Math.ceil(width / charWidth),
				Math.ceil(height / charHeight)
			);
		};

		const observer = new ResizeObserver(measure);
		observer.observe(ref.current);
		measure();

		return () => observer.disconnect();
	}, []);

	const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
		const { key } = event;

		if ((event.ctrlKey || event.metaKey) && key === "c" && !event.shiftKey) {
			event.preventDefault();
			shell.interrupt();
			return;
		}

		if (state.stream) return;

		if (key === "Enter") {
			const value = (event.target as HTMLInputElement).value;
			void shell.submitInput(value);
			setInputKey((previousKey) => previousKey + 1);
		} else if (key === "ArrowUp") {
			event.preventDefault();
			shell.updateHistoryIndex(1);
		} else if (key === "ArrowDown") {
			event.preventDefault();
			shell.updateHistoryIndex(-1);
		}
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		shell.setInputValue(event.target.value);
	};

	const renderOutput = () => {
		if (state.isUsingAltScreen) {
			return state.ttyBuffer ? <OutputLine text={state.ttyBuffer}/> : null;
		}

		let startIndex = 0;
		for (let i = state.history.length - 1; i >= 0; i--) {
			if (state.history[i].clear) {
				startIndex = i + 1;
				break;
			}
		}

		return <>
			{state.history.slice(startIndex).map((entry, index) => 
				<OutputLine text={entry.text} key={index}/>
			)}
			{state.ttyBuffer && <OutputLine text={state.ttyBuffer}/>}
		</>;
	};

	const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
		focus?.(event);

		if (event.button === 2) {
			event.preventDefault();
			navigator.clipboard.readText().then((text) => {
				shell.setInputValue(state.inputValue + text);
			}).catch((error) => {
				console.error(error);
			});
		}
	};

	const onContextMenu: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
	};

	return <div
		ref={ref} 
		tabIndex={0}
		className={styles.Terminal}
		onKeyDown={onKeyDown}
		onMouseDown={onMouseDown}
		onContextMenu={onContextMenu}
		onClick={(event) => {
			if (window.getSelection()?.toString() === "") {
				event.preventDefault();
				if (state.stream) {
					ref.current?.focus();
				} else {
					inputRef.current?.focus();
				}
			}
		}}
	>
		<div className={styles.History}>
			{renderOutput()}
		</div>
		{!state.isUsingAltScreen && (
			!state.stream
				? <InputLine
					key={inputKey}
					value={state.inputValue}
					prefix={state.prefix}
					onChange={onChange}
					inputRef={inputRef}
				/>
				: null
		)}
	</div>;
}