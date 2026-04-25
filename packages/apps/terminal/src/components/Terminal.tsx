import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Terminal.module.css";
import { OutputLine } from "./OutputLine";
import { InputLine } from "./InputLine";
import { Button, HistoryFlags, useShell, utilStyles, WindowProps } from "@prozilla-os/core";
import { Ansi, Vector2 } from "@prozilla-os/shared";
import { faStop } from "@fortawesome/free-solid-svg-icons";

export interface TerminalProps extends WindowProps {
	path?: string;
	input?: string;
	autoSubmit?: boolean;
}

export function Terminal({ app, path: startPath, input, setTitle, close: exit, active, focus, autoSubmit }: TerminalProps) {
	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const sizeRef = useRef(Vector2.ZERO);
	const [charSize, setCharSize] = useState(Vector2.ZERO);
	const [inputKey, setInputKey] = useState(0);
	const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
	const [shell, state] = useShell({
		app,
		path: startPath,
		input,
		exit: exit!,
		sizeRef,
	});

	useEffect(() => {
		if (autoSubmit && input && state.prompt && !hasAutoSubmitted) {
			setHasAutoSubmitted(true);
			if (window.confirm(`Do you want to run the following command?\n\n${input}`)) {
				void shell.run(input);
				setInputKey((previousKey) => previousKey + 1);
			}
		}
	}, [autoSubmit, input, hasAutoSubmitted, state.prompt, shell]);

	useEffect(() => {
		setTitle?.(Ansi.strip(state.prompt).trim());
	}, [state.prompt, setTitle]);

	useEffect(() => {
		if (!active)
			return;

		if (state.stream) {
			ref.current?.focus();
		} else {
			inputRef.current?.focus();
		}
	}, [active, state.stream]);

	useEffect(() => {
		if (inputRef.current && !state.stream) {
			const length = state.line.length;
			inputRef.current.setSelectionRange(length, length);
		}
	}, [state.historyOffset]);

	const scrollDown = () => {
		if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
	};

	useEffect(() => {
		scrollDown();
	}, [state.history.length, state.line, state.ttyBuffer]);

	useEffect(() => {
		if (!ref.current)
			return;

		const measure = () => {
			if (!ref.current)
				return;

			const span = document.createElement("span");
			span.innerText = "M".repeat(100);
			span.style.position = "absolute";
			span.style.visibility = "hidden";
			span.style.whiteSpace = "pre";
			span.style.fontFamily = "var(--mono-font-family)";
			span.style.letterSpacing = "-0.03em";

			ref.current.appendChild(span);
			const spanRect = span.getBoundingClientRect();
			ref.current.removeChild(span);

			const style = getComputedStyle(ref.current);
			const charWidth = spanRect.width / 100;
			const charHeight = spanRect.height || parseFloat(style.lineHeight);

			const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
			const verticalPadding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
			const terminalRect = ref.current.getBoundingClientRect();

			if (charWidth > 0 && charHeight > 0)
				setCharSize(new Vector2(charWidth, charHeight));

			sizeRef.current.set(
				Math.floor((terminalRect.width - horizontalPadding) / charWidth),
				Math.floor((terminalRect.height - verticalPadding) / charHeight)
			);
		};

		const observer = new ResizeObserver(measure);
		observer.observe(ref.current);
		measure();

		return () => observer.disconnect();
	}, []);

	const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
		void shell.handleKeyDown(event);

		if (event.key === "Enter" && !state.stream)
			setInputKey((previousKey) => previousKey + 1);
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		shell.setLine(event.target.value);
	};

	const renderedOutput = useMemo(() => {
		if (state.isUsingAltScreen)
			return state.ttyBuffer ? <OutputLine text={state.ttyBuffer}/> : null;

		let startIndex = 0;
		for (let i = state.history.length - 1; i >= 0; i--) {
			if ((state.history[i].flags & HistoryFlags.Clear) !== 0) {
				startIndex = i + 1;
				break;
			}
		}

		return state.history.slice(startIndex).map((entry, index) => 
			<OutputLine text={entry.displayText} key={index}/>
		);
	}, [state.history, state.isUsingAltScreen, state.ttyBuffer]);

	const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
		focus?.(event);

		if (event.button === 2) {
			event.preventDefault();
			void navigator.clipboard.readText().then((text) => {
				const input = inputRef.current;
				if (!input) return;

				const start = input.selectionStart ?? state.line.length;
				const end = input.selectionEnd ?? state.line.length;
				
				shell.setLine((line) => {
					return line.substring(0, start) + text + line.substring(end);
				});

				const newPos = start + text.length;
				setTimeout(() => {
					input.focus();
					input.setSelectionRange(newPos, newPos);
				}, 0);
			}).catch((error) => {
				console.error(error);
			});
		}
	};

	const onContextMenu: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
	};

	const terminalStyle = useMemo(() => {
		if (charSize.x === 0 || charSize.y === 0)
			return {};

		return {
			"--char-width": `${charSize.x}px`,
			"--char-height": `${charSize.y}px`,
		};
	}, [charSize]);

	const cursorStyle = useMemo(() => {
		if (!state.isRawMode || charSize.x === 0 || charSize.y === 0)
			return {};

		return {
			left: state.cursorPosition.x * charSize.x,
			top: state.cursorPosition.y * charSize.y,
		};
	}, [state.cursorPosition, state.isRawMode, charSize]);

	return <div
		ref={ref} 
		tabIndex={0}
		className={styles.Terminal}
		style={terminalStyle}
		onKeyDown={onKeyDown}
		onMouseDown={onMouseDown}
		onContextMenu={onContextMenu}
		onClick={(event) => {
			if (!window.getSelection()?.toString().length) {
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
			{renderedOutput}
			{state.isRawMode && <div className={styles.VirtualCursor} style={cursorStyle}/>}
		</div>
		{!state.isUsingAltScreen && !state.stream && <InputLine
			key={inputKey}
			value={state.line}
			prefix={(state.ttyBuffer ?? "") + state.prompt}
			onChange={onChange}
			inputRef={inputRef}
		/>}
		{!state.isUsingAltScreen && state.stream && state.ttyBuffer && <OutputLine text={state.ttyBuffer}/>}
		{state.stream && <Button
			className={`${styles.InterruptButton} ${utilStyles.TextBold}`} 
			onClick={() => shell.interrupt()}
			title="Interrupt (Ctrl+C)"
			icon={faStop}
		>
			Stop
		</Button>}
	</div>;
}