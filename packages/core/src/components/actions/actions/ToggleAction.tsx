import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatShortcut } from "../../../features/_utils/string.utils";
import styles from "../Actions.module.css";
import { ReactElement, useState } from "react";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { ActionProps } from "../Actions";

interface ToggleActionProps extends ActionProps {
	initialValue: boolean;
}

export function ToggleAction({ actionId, label, shortcut, initialValue, onTrigger }: ToggleActionProps): ReactElement {
	const [active, setActive] = useState(initialValue ?? false);

	return (<button key={actionId} className={styles.Button} tabIndex={0} onClick={(event) => {
		onTrigger?.(event as unknown as Event, !active);
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