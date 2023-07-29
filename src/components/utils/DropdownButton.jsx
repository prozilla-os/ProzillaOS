import { useState } from "react";
import styles from "./DropdownButton.module.css";
import OutsideClickListener from "../../hooks/utils/outsideClick.js";

/**
 * @param {Object} props 
 * @param {String} props.label
 * @param {Object.<string, Function>} props.options
 * @returns 
 */
export function DropdownButton({ label, options }) {
	const [open, setOpen] = useState(false);

	return (
		<OutsideClickListener onOutsideClick={() => { setOpen(false); }}>
			<div className={styles.Container}>
				<button className={styles.Button} onClick={() => { setOpen(!open) }}>
					{label}
				</button>
				{open && options
					? (<div className={styles.Dropdown}>
						{Object.entries(options).map(([label, callback]) =>
							<button key={label} onClick={() => {
								setOpen(false);
								callback();
							}}>
								{label}
							</button>
						)}
					</div>)
					: null
			}
			</div>
		</OutsideClickListener>
	)
}