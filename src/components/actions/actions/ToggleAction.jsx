import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatShortcut } from "../../../features/utils/string.js";
import styles from "../Actions.module.css";
import { useState } from "react";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

export function ToggleAction({ actionId, label, shortcut, initialValue, onTrigger }) {
	const [active, setActive] = useState(initialValue ?? false);

	return (<button key={actionId} className={styles.Button} tabIndex={0} onClick={(event) => {
		onTrigger(event, !active);
		setActive(!active);
	}}>
		<span className={styles.Label}>
			<div className={styles.Icon}>
				{active 
					? <FontAwesomeIcon icon={faSquareCheck}/>
					: <FontAwesomeIcon icon={faSquare}/>
				}
			</div>
			<p>{label}</p>
		</span>
		{shortcut && <p className={styles.Shortcut}>{formatShortcut(shortcut)}</p>}
	</button>);
}