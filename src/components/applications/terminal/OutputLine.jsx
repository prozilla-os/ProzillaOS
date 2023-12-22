import Ansi from "./Ansi.jsx";
import styles from "./Terminal.module.css";

/**
 * @param {object} props 
 * @param {string} props.text
 */
export function OutputLine({ text }) {
	const lines = text?.split("\n");

	return (<>
		{lines.map((line, index) =>
			<Ansi key={index} className={styles.Output} useClasses>{line === "" ? " " : line}</Ansi>
		)}
	</>);
}