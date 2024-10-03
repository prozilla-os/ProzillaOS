import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatShortcut } from "../../../features/_utils/keyboard.utils";
import styles from "../Actions.module.css";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useState } from "react";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { ActionProps } from "../Actions";

/**
 * @param {object} props 
 * @param {string} props.actionId
 * @param {{
 * 	label: string,
 * 	shortcut: string[]
 * }[]} props.options
 * @param {number} props.initialIndex
 * @param {Function} props.onTrigger
 */

interface RadioActionProps extends ActionProps {
	options: {
		label: string;
		shortcut?: string[]
	}[];
	initialIndex: number;
}

export function RadioAction({ actionId, options, initialIndex, onTrigger }: RadioActionProps): ReactElement {
	const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);

	return (<div key={actionId}>
		{options.map(({ label, shortcut }, index) =>
			<button key={label} className={styles.Button} tabIndex={0} onClick={(event) => {
				setActiveIndex(index);
				onTrigger?.(event as unknown as Event, index);
			}}>
				<span className={styles.Label}>
					<div className={styles.Icon}>
						{activeIndex === index
							? <FontAwesomeIcon icon={faCircleDot}/>
							: <FontAwesomeIcon icon={faCircle}/>
						}
					</div>
					<p>{label}</p>
				</span>
				{shortcut && <p className={styles.Shortcut}>{formatShortcut(shortcut)}</p>}
			</button>
		)}
	</div>);
}