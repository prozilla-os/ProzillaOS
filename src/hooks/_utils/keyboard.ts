import { useCallback, useEffect, useState } from "react";
import { removeFromArray } from "../../features/_utils/array.utils";

interface UseKeyboardListenerParams {
	onKeyDown?: (event: KeyboardEvent) => void;
	onKeyUp?: (event: KeyboardEvent) => void;
};

export function useKeyboardListener({ onKeyDown, onKeyUp }: UseKeyboardListenerParams) {
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

interface UseShortcutsParams {
	options: Record<string, Record<string, Function>> | Record<string, Function>;
	shortcuts?: Record<string, Record<string, string[]>> | Record<string, string[]>;
	useCategories?: boolean,
}

/**
 * TO DO: rewrite to use a global shortcuts manager instead, to allow certain shortcuts to be prioritized and prevent conflicts
 */
export function useShortcuts({ options, shortcuts, useCategories = true }: UseShortcutsParams) {
	const [activeKeys, setActiveKeys] = useState<string[]>([]);

	const checkShortcuts = useCallback((event: KeyboardEvent, allowExecution = true) => {
		if (!shortcuts)
			return;

		const keys = [...activeKeys];

		const checkGroup = (group: Record<string, string[]>, category?: string) => {
			for (const [name, shortcut] of Object.entries(group)) {
				let active = true;

				shortcut.forEach((key) => {
					if (!keys.includes(key) && event.key !== key)
						return active = false;
				});

				if (!active)
					continue;

				event.preventDefault();
				event.stopPropagation();

				if (!shortcut.includes(event.key) || !allowExecution)
					continue;

				if (category != null) {
					(options?.[category]?.[name] as Function)?.(event);
				} else {
					(options?.[name] as Function)?.(event);
				}
			}
		};

		if (useCategories) {
			for (const [category, group] of Object.entries(shortcuts)) {
				checkGroup(group as Record<string, string[]>, category);
			}
		} else {
			checkGroup(shortcuts as Record<string, string[]>);
		}

		setActiveKeys(keys);
	}, [activeKeys, options, shortcuts, useCategories]);

	useEffect(() => {
		const onBlur = () => {
			setActiveKeys([]);
		};

		document.addEventListener("blur", onBlur);

		return () => {
			document.removeEventListener("blur", onBlur);
		};
	}, []);

	const onKeyDown = (event: KeyboardEvent) => {
		const isRepeated = activeKeys.includes(event.key);
		checkShortcuts(event, isRepeated);

		if (!isRepeated)
			setActiveKeys(activeKeys.concat([event.key]));
	};

	const onKeyUp = (event: KeyboardEvent) => {
		checkShortcuts(event);

		if (activeKeys.includes(event.key)) {
			const keys = [...activeKeys];
			removeFromArray(event.key, keys);
			setActiveKeys(keys);
		}
	};

	useKeyboardListener({ onKeyDown, onKeyUp });
}