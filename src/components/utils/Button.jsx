import styles from "./Button.module.css";

/**
 * @param {object} props 
 */
export function Button(props) {
	const { className = "", children } = props;

	return (
		<button
			className={`${className} ${styles.Button}`}
			tabIndex={0}
			{...props}
		>
			{children}
		</button>
	);
}