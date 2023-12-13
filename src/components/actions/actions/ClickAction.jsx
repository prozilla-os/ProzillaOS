import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatShortcut } from "../../../features/utils/string.js";
import styles from "../Actions.module.css";

export function ClickAction({ actionId, label, shortcut, onTrigger, icon }) {
	return (<button key={actionId} className={styles.Button} tabIndex={0} onClick={onTrigger}>
		<span className={styles.Label}>
			{icon && <div className={styles.Icon}><FontAwesomeIcon icon={icon}/></div>}
			<p>{label}</p>
		</span>
		{shortcut && <p className={styles.Shortcut}>{formatShortcut(shortcut)}</p>}
	</button>);
}