import { DropdownButton } from "../../utils/DropdownButton.jsx";
import styles from "./HeaderMenu.module.css";

/**
 * @param {Object} props 
 * @param {Function} props.onNew 
 * @param {Function} props.onOpen 
 * @param {Function} props.onSave 
 * @param {Function} props.onSaveAs 
 * @param {Function} props.onExit 
 */
export function HeaderMenu({ onNew, onOpen, onSave, onSaveAs, onExit }) {
	return (
		<div className={styles.Container}>
			<DropdownButton label="File" options={{
				"New": () => {
					onNew?.();
				},
				"Open": () => {
					onOpen?.();
				},
				"Save": () => {
					onSave?.();
				},
				"Save as": () => {
					onSaveAs?.();
				},
				"Exit": () => {
					onExit?.();
				},
			}}/>
			<DropdownButton label="Edit"/>
			<DropdownButton label="View"/>
		</div>
	);
}