import { ChangeEvent, KeyboardEvent, RefObject, useLayoutEffect, useRef, useState } from "react";
import styles from "./Terminal.module.css";
import { Ansi } from "./Ansi";

interface InputLineProps {
    value: string;
    prefix: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    inputRef: RefObject<HTMLInputElement>;
}

export function InputLine({ value, prefix, onChange, onKeyUp, onKeyDown, inputRef }: InputLineProps) {
	const [cursorPosition, setCursorPosition] = useState(0);
	const selectionReference = useRef<number | null>(null);

	useLayoutEffect(() => {
		const input = inputRef.current;
		if (input && selectionReference.current !== null) {
			input.setSelectionRange(selectionReference.current, selectionReference.current);
			setCursorPosition(selectionReference.current);
			selectionReference.current = null;
		} else if (input && input.selectionStart !== null) {
			setCursorPosition(input.selectionStart);
		}
	}, [value, inputRef]);

	const checkCursorPosition = () => {
		const selectionStart = inputRef.current?.selectionStart;
		if (selectionStart != null) setCursorPosition(selectionStart);
	};

	return <span className={styles.Input}>
		{prefix && <Ansi className={styles.Prefix} useClasses>{prefix}</Ansi>}
		<span className={styles["Input-container"]} style={{ "--cursor-offset": cursorPosition }}>
			<span aria-hidden="true">{value}</span>
			<input
				id="input"
				value={value}
				aria-label="Command input"
				onChange={(event) => {
					selectionReference.current = event.target.selectionStart;
					onChange(event);
				}}
				ref={inputRef}
				onKeyUp={onKeyUp}
				onKeyDown={(event) => {
					onKeyDown?.(event);
					checkCursorPosition();
				}}
				onClick={checkCursorPosition}
				onSelect={checkCursorPosition}
				spellCheck={false}
				autoComplete="off"
				autoFocus
			/>
		</span>
	</span>;
}