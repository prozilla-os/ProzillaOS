import styles from "../Actions.module.css";

export function TextDisplay({ children }) {
	return <p className={styles.TextDisplay}>
		{children}
	</p>;
}