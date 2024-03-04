import styles from "./UtilMenu.module.css";

/**
 * @param {object} props 
 * @param {boolean} props.active
 * @param {Function} props.setActive
 * @param {*} props.className
 * @param {*} props.children
 */
export function UtilMenu({ active, setActive, className, children }) {
	const classNames = [styles["Container-outer"]];
	if (active)
		classNames.push(styles.Active);
	if (className != null)
		classNames.push(className);

	return (<div className={classNames.join(" ")}>
		<div className={styles["Container-inner"]}>
			{children}
		</div>
	</div>);
}