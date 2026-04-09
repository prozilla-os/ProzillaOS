import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import styles from "./Terminal.module.css";
import { OutputLine } from "./OutputLine";
import { InputLine } from "./InputLine";
import { HOSTNAME, Shell, USERNAME, useSettingsManager, useSystemManager, useVirtualRoot, WindowProps } from "@prozilla-os/core";
import { Vector2 } from "@prozilla-os/shared";

export interface TerminalProps extends WindowProps {
    path?: string;
    input?: string;
}

export function Terminal({ app, path: startPath, input, setTitle, close: exit, active, focus }: TerminalProps) {
	const systemManager = useSystemManager();
	const settingsManager = useSettingsManager();
	const virtualRoot = useVirtualRoot();
	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const sizeRef = useRef(Vector2.ZERO);

	const [inputKey, setInputKey] = useState(0);

	const shell = useMemo(() => new Shell({
		app,
		path: startPath,
		input,
		virtualRoot: virtualRoot!,
		systemManager,
		settingsManager: settingsManager!,
		exit: exit!,
		sizeRef,
	}), [app, startPath, input, virtualRoot, systemManager, settingsManager, exit]);

	const state = useSnapshot(shell.state);

	useEffect(() => {
		setTitle?.(`${USERNAME}@${HOSTNAME}: ${state.currentDirectory.root ? "/" : state.currentDirectory.path}`);
	}, [state.currentDirectory.path, state.currentDirectory.root, setTitle]);

	useEffect(() => {
		if (!inputRef.current || !active) return;
		inputRef.current.focus();
	}, [active]);

	const scrollDown = () => {
		if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
	};

	useEffect(() => {
		scrollDown();
	}, [state.history.length, state.inputValue, state.streamOutput]);

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

	const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
		const value = (event.target as HTMLInputElement).value;
		const { key } = event;

		if (key === "Enter") {
			void shell.submitInput(value);
			setInputKey((previousKey) => previousKey + 1);
		} else if (key === "ArrowUp") {
			event.preventDefault();
			shell.updateHistoryIndex(1);
		} else if (key === "ArrowDown") {
			event.preventDefault();
			shell.updateHistoryIndex(-1);
		} else if (active && (event.ctrlKey || event.metaKey) && key === "c") {
			shell.stop();
		}
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		shell.setInputValue(event.target.value);
	};

	const displayHistory = () => {
		let startIndex = 0;
		for (let i = state.history.length - 1; i >= 0; i--) {
			if (state.history[i].clear) {
				startIndex = i + 1;
				break;
			}
		}

		return state.history.slice(startIndex).map((entry, index) => {
			return <OutputLine text={entry.text} key={index}/>;
		});
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
		className={styles.Terminal}
		onMouseDown={onMouseDown}
		onContextMenu={onContextMenu}
		onClick={(event) => {
			if (window.getSelection()?.toString() === "") {
				event.preventDefault();
				inputRef.current?.focus();
			}
		}}
	>
		<div className={styles.History}>
			{displayHistory()}
		</div>
		{!state.stream
			? <InputLine
				key={inputKey}
				value={state.inputValue}
				prefix={state.prefix}
				onKeyDown={onKeyDown}
				onChange={onChange}
				inputRef={inputRef}
			/>
			: <OutputLine text={state.streamOutput ?? ""}/>
		}
	</div>;
}