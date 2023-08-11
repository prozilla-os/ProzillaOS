import { useEffect, useState } from "react";
import { removeFromArray } from "../../features/utils/array.js";

/**
 * @param {object} params
 * @param {Function} params.onKeyDown
 * @param {Function} params.onKeyUp
 */
export function useKeyboardListener({ onKeyDown, onKeyUp }) {
	useEffect(() => {
		if (onKeyDown)
			document.addEventListener("keydown", onKeyDown);
		if (onKeyUp)
			document.addEventListener("keyup", onKeyUp);

		return () => {
			if (onKeyDown)
				document.removeEventListener("keydown", onKeyDown);
			if (onKeyUp)
				document.removeEventListener("keyup", onKeyUp);
		};
	}, [onKeyDown, onKeyUp]);
}

/**
 * @param {object} props
 * @param {Object<string, Object<string, Function>>} props.options
 * @param {Object<string, Object<string, string[]>>} props.shortcuts 
 * @param {boolean} props.useCategories
 */
export function useShortcuts({ options, shortcuts, useCategories = true }) {
	const [activeKeys, setActiveKeys] = useState([]);

	const checkShortcuts = (event, allowExecution = true) => {
		if (!shortcuts)
			return;

		const checkGroup = (group, category) => {
			for (const [name, shortcut] of Object.entries(group)) {
				let active = true;

				shortcut.forEach((key) => {
					if (!activeKeys.includes(key) && event.key !== key)
						return active = false;
				});

				if (!active)
					continue;

				event.preventDefault();

				if (!shortcut.includes(event.key) || !allowExecution)
					continue;

				if (category != null) {
					options?.[category]?.[name]?.();
				} else {
					options?.[name]?.();
				}
			}
		};

		if (useCategories) {
			for (const [category, group] of Object.entries(shortcuts)) {
				checkGroup(group, category);
			}
		} else {
			checkGroup(shortcuts);
		}
	};

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
}