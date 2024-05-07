import { CSSProperties, MutableRefObject, useState } from "react";
import styles from "./Terminal.module.css";
import Ansi from "./Ansi";


interface InputLineProps {
	value: string;
	prefix: string;
	onChange: Function;
	onKeyUp?: Function;
	onKeyDown?: Function;
	inputRef: MutableRefObject<HTMLInputElement>;
}

export function InputLine({ value, prefix, onChange, onKeyUp, onKeyDown, inputRef }: InputLineProps) {
	const [cursorPosition, setCursorPosition] = useState(0);

	const checkCursorPosition = () => {
		setCursorPosition(inputRef.current?.selectionStart);
	};

	return (
		<span className={styles.Input}>
			{prefix && <Ansi className={[styles.Prefix]} useClasses>{prefix}</Ansi>}
			<span className={styles["Input-container"]} style={{ "--cursor-offset": cursorPosition } as CSSProperties}>
				<span aria-hidden="true">{value}</span>
				<input
					id="input"
					value={value}
					aria-label="Command input"
					onChange={(event) => {
						onChange(event);
						checkCursorPosition();
					}}
					ref={inputRef}
					onKeyUp={(event) => { onKeyUp?.(event); }}
					onKeyDown={(event) => {
						onKeyDown?.(event);
						checkCursorPosition();
					}}
					onClick={checkCursorPosition}
					onTouchEnd={checkCursorPosition}
					onSelect={checkCursorPosition}
					onCut={checkCursorPosition}
					onCopy={checkCursorPosition}
					onPaste={checkCursorPosition}
					spellCheck={false}
					autoComplete="off"
					autoFocus
				/>
			</span>
		</span>
	);
}