import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Actions.module.css";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string|object} props.icon
 * @param {*} props.children
 */
export function DropdownAction({ label, icon, children }) {
	const [showContent, setShowContent] = useState(false);

	const classNames = [styles.Dropdown];
	if (showContent)
		classNames.push(styles.Active);

	return (<div
		key={label}
		className={classNames.join(" ")}
		tabIndex={0}
		onMouseEnter={() => { setShowContent(true); }}
		onMouseLeave={() => { setShowContent(false); }}
	>
		<span className={styles.Label}>
			{icon && <div className={styles.Icon}><FontAwesomeIcon icon={icon}/></div>}
			<p>{label}</p>
		</span>
		<div className={styles["Dropdown-arrow"]}><FontAwesomeIcon icon={faCaretRight}/></div>
		<div className={styles["Dropdown-content"]}>
			{children}
		</div>
	</div>);
}