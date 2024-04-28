import { forwardRef } from "react";
import Ansi from "./Ansi.jsx";
import styles from "./Terminal.module.css";

/**
 * @param {object} props 
 * @param {string} props.text
 * @param {*} props.ref
 */
export const OutputLine = forwardRef(({ text }, ref) => {
	const lines = text?.split("\n");

	return (<div ref={ref}>
		{lines.map((line, index) =>
			<Ansi key={index} className={styles.Output} useClasses>{line === "" ? " " : line}</Ansi>
		)}
	</div>);
});