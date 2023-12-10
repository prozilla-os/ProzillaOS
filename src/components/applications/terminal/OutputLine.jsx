import styles from "./Terminal.module.css";

/**
 * @param {object} props 
 * @param {string} props.text
 */
export function OutputLine({ text }) {
	const lines = text?.split("\n");

	return (<>
		{lines.map((line, index) =>
			<pre key={index} className={styles.Output}>{line === "" ? " " : line}</pre>
		)}
	</>);
}