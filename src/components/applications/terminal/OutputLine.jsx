import styles from "./Terminal.module.css";

/**
 * @param {object} props 
 * @param {string} props.text
 */
export function OutputLine({ text }) {
	const lines = text?.split("\n");

	return (<>
		{lines.map((line, index) =>
			<p key={index} className={styles.Output}>{line}</p>
		)}
	</>);
}