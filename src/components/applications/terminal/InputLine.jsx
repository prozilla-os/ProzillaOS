import { useState } from "react";
import styles from "./Terminal.module.css";

/**
 * @param {object} props 
 * @param {string} props.value
 * @param {string} props.prefix
 * @param {Function} props.onChange
 * @param {Function} props.onKeyUp
 * @param {Function} props.onKeyDown
 * @param {import("react").MutableRefObject} props.inputRef
 */
export function InputLine({ value, prefix, onChange, onKeyUp, onKeyDown, inputRef }) {
	const [cursorPosition, setCursorPosition] = useState(0);

	const checkCursorPosition = () => {
		setCursorPosition(inputRef.current?.selectionStart);
	};

	return (
		<span className={styles.Input}>
			{prefix && <p className={[styles.Prefix]}>{prefix}</p>}
			<span className={styles["Input-container"]} style={{ "--cursor-offset": cursorPosition }}>
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
					onKeyUp={onKeyUp}
					onKeyDown={(event) => {
						onKeyDown(event);
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
					size=""
				/>
			</span>
		</span>
	);
}