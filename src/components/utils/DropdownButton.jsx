import { useState } from "react";
import styles from "./DropdownButton.module.css";
import OutsideClickListener from "../../hooks/utils/outsideClick.js";
import { formatShortcut } from "../../features/utils/string.js";

/**
 * @param {Object} props 
 * @param {String} props.label
 * @param {Object.<string, Function>} props.options
 */
export function DropdownButton({ label, options, shortcuts }) {
	const [open, setOpen] = useState(false);

	return (
		<OutsideClickListener onOutsideClick={() => { setOpen(false); }}>
			<div className={styles.Container}>
				<button title={label} className={styles.Button} onClick={() => { setOpen(!open) }}>
					{label}
				</button>
				{open && options
					? (<div className={styles.Dropdown}>
						{Object.entries(options).map(([label, callback]) =>
							<button title={label} key={label} onClick={() => {
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
	)
}