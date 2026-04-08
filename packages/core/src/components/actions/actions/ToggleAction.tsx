import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatShortcut } from "../../../features/_utils/keyboard.utils";
import styles from "../Actions.module.css";
import { ReactElement, useState } from "react";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { ActionProps } from "../Actions";
import { useClassNames } from "../../../hooks";

export interface ToggleActionProps extends ActionProps {
	initialValue?: boolean;
}

export function ToggleAction({ actionId, label, shortcut, initialValue = false, onTrigger }: ToggleActionProps): ReactElement {
	const [active, setActive] = useState(initialValue);

	return <button key={actionId} className={useClassNames([styles.Button], "Actions", "Toggle", active ? "Active" : undefined)} tabIndex={0} onClick={(event) => {
		onTrigger?.(event as unknown as Event, !active);
		setActive(!active);
	}}>
		<span className={useClassNames([styles.Label], "Actions", "Label")}>
			<div className={styles.Icon}>
				{active 
					? <FontAwesomeIcon icon={faSquareCheck}/>
					: <FontAwesomeIcon icon={faSquare}/>
				}
			</div>
			<p>{label}</p>
		</span>
		{shortcut && <p className={styles.Shortcut}>{formatShortcut(shortcut)}</p>}
	</button>;
}