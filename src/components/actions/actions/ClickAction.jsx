import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatShortcut } from "../../../features/utils/string.js";
import styles from "../Actions.module.css";
import { ImagePreview } from "../../applications/file-explorer/directory-list/ImagePreview.jsx";

export function ClickAction({ actionId, label, shortcut, onTrigger, icon }) {
	return (<button key={actionId} className={styles.Button} tabIndex={0} onClick={onTrigger}>
		<span className={styles.Label}>
			{icon && <div className={styles.Icon}>
				{typeof icon == "string"
					? <ImagePreview source={icon} className={styles["Image-icon"]}/>
					: <FontAwesomeIcon icon={icon}/>
				}
			</div>}
			<p>{label}</p>
		</span>
		{shortcut && <p className={styles.Shortcut}>{formatShortcut(shortcut)}</p>}
	</button>);
}