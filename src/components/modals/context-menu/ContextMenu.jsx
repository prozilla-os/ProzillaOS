import styles from "./ContextMenu.module.css";

export function ContextMenu() {
	return <p className={styles.Container} onContextMenu={(event) => { event.preventDefault(); }}>This is a context menu!</p>;
}