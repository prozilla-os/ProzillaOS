import { useEffect, useState } from "react";
import styles from "./DropdownButton.module.css";
import { OutsideClickListener } from "../../../hooks/_utils/outsideClick";
import { formatShortcut } from "../../../features/_utils/keyboard.utils";

export interface DropdownButtonProps {
	/** The label of the button */
	label: string;
	/** The options in the dropdown menu mapped to the function that handles their selection */
	options: Record<string, () => void>;
	/** The keyboard shortcut for options in the dropdown menu */
	shortcuts: Record<string, string[]>;
}

/**
 * Component that opens a dropdown menu
 */
export function DropdownButton({ label, options, shortcuts }: DropdownButtonProps) {
	const [open, setOpen] = useState(false);
	const [tabIndex, setTabIndex] = useState(-1);

	useEffect(() => {
		setTabIndex(open ? 0 : -1);
	}, [open]);

	return (
		<OutsideClickListener onOutsideClick={() => { setOpen(false); }}>
			<div className={styles.DropdownButton}>
				<button className={styles.Button} tabIndex={0} onClick={() => { setOpen(!open); }}>
					{label}
				</button>
				{open && options
					? (<div className={styles.Dropdown}>
						{Object.entries(options).map(([label, callback]: [label: string, callback: () => void]) =>
							<button key={label} tabIndex={tabIndex} onClick={() => {
								setOpen(false);
								callback();
							}}>
								<p className={styles.Label}>{label}</p>
								{Object.keys(shortcuts).includes(label)
									? <p className={styles.Shortcut}>{formatShortcut(shortcuts[label])}</p>
									: null
								}
							</button>
						)}
					</div>)
					: null
				}
			</div>
		</OutsideClickListener>
	);
}