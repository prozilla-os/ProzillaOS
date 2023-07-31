import { useState } from "react";
import { removeFromArray } from "../../../features/utils/array.js";
import { useKeyboardListener } from "../../../hooks/utils/keyboard.js";
import { DropdownButton } from "../../utils/DropdownButton.jsx";
import styles from "./HeaderMenu.module.css";

/**
 * @param {Object} props 
 * @param {Object<String, Object<String, Function>>} props.options
 * @param {Object<String, Object<String, Array<String>>>} props.shortcuts
 */
export function HeaderMenu({ options, shortcuts }) {
	const [activeKeys, setActiveKeys] = useState([]);

	const checkShortcuts = (event, allowExecution = true) => {
		for (const [category, group] of Object.entries(shortcuts)) {
			for (const [name, shortcut] of Object.entries(group)) {
				let active = true;

				shortcut.forEach((key) => {
					if (!activeKeys.includes(key) && event.key != key)
						return active = false;
				});

				if (active) {
					event.preventDefault();
					if (shortcut.includes(event.key) && allowExecution) {
						options?.[category]?.[name]?.();
					}
				}
			}
		}
	}

	const onKeyDown = (event) => {
		const isRepeated = activeKeys.includes(event.key);
		checkShortcuts(event, isRepeated);

		if (!isRepeated)
			setActiveKeys(activeKeys.concat([event.key]));
	};

	const onKeyUp = (event) => {
		checkShortcuts(event);

		if (activeKeys.includes(event.key)) {
			const keys = [...activeKeys];
			removeFromArray(event.key, keys);
			setActiveKeys(keys);
		}
	};

	useKeyboardListener({ onKeyDown, onKeyUp });

	return (
		<div className={styles.Container}>
			{Object.entries(options).map(([key, value]) => 
				<DropdownButton key={key} label={key} options={value} shortcuts={shortcuts[key]}/>
			)}
		</div>
	);
}