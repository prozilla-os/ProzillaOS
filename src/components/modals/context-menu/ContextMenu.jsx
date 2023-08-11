import Modal from "../../../features/modals/modal.js";
import { formatShortcut } from "../../../features/utils/string.js";
import styles from "./ContextMenu.module.css";

/**
 * @param {object} props 
 * @param {Modal} props.modal 
 * @param {Object<string, Function>} props.options 
 * @param {Object<string, string[]>} props.shortcuts 
 */
export function ContextMenu({ modal, options, shortcuts }) {
	return (<div className={styles.Container}>
		{Object.entries(options).map(([label, callback]) =>
			<button className={styles.Button} key={label} tabIndex={0} onClick={() => {
				modal.close();
				callback();
			}}>
				<p className={styles.Label}>{label}</p>
				{shortcuts && Object.keys(shortcuts).includes(label)
					? <p className={styles.Shortcut}>{formatShortcut(shortcuts[label])}</p>
					: null
				}
			</button>
		)}
	</div>);
}