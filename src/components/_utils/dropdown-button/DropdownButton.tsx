import { useEffect, useState } from "react";
import styles from "./DropdownButton.module.css";
import OutsideClickListener from "../../../hooks/_utils/outsideClick";
import { formatShortcut } from "../../../features/_utils/string.utils";

/**
 * @param {object} props 
 * @param {string} props.label
 * @param {Object<string, Function>} props.options
 * @param {Object<string, string[]>} props.shortcuts
 */
export function DropdownButton({ label, options, shortcuts }) {
	const [open, setOpen] = useState(false);
	const [tabIndex, setTabIndex] = useState(-1);

	useEffect(() => {
		setTabIndex(open ? 0 : -1);
	}, [open]);

	return (
		<OutsideClickListener onOutsideClick={() => { setOpen(false); }}>
			<div className={styles.Container}>
				<button className={styles.Button} tabIndex={0} onClick={() => { setOpen(!open); }}>
					{label}
				</button>
				{open && options
					? (<div className={styles.Dropdown}>
						{Object.entries(options).map(([label, callback]: [label: string, callback: Function]) =>
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