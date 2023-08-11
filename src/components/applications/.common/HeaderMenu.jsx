import { useShortcuts } from "../../../hooks/utils/keyboard.js";
import { DropdownButton } from "../../utils/DropdownButton.jsx";
import styles from "./HeaderMenu.module.css";

/**
 * @param {Object} props 
 * @param {Object<string, Object<string, Function>>} props.options
 * @param {Object<string, Object<string, string[]>>} props.shortcuts
 */
export function HeaderMenu({ options, shortcuts }) {
	useShortcuts({ options, shortcuts });

	return (
		<div className={styles.Container}>
			{Object.entries(options).map(([key, value]) => 
				<DropdownButton key={key} label={key} options={value} shortcuts={shortcuts[key]}/>
			)}
		</div>
	);
}