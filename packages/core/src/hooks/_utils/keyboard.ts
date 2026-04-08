import { useCallback, useEffect, useState } from "react";
import { removeFromArray } from "@prozilla-os/shared";

export interface UseKeyboardListenerParams {
	/** Function that handles `"keydown"` events. */
	onKeyDown?: (event: KeyboardEvent) => void;
	/** Function that handles `"keyup"` events. */
	onKeyUp?: (event: KeyboardEvent) => void;
};

/**
 * Creates listeners for `"keydown"` and `"keyup"` events.
 */
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

type ShortcutHandler = (event: KeyboardEvent) => void;

type FlatOptions = Record<string, ShortcutHandler>;
type CategorizedOptions = Record<string, Record<string, ShortcutHandler>>;

type FlatShortcuts = Record<string, string[]>;
type CategorizedShortcuts = Record<string, Record<string, string[]>>;

export type UseShortcutsParams =
    | { useCategories: true; options: CategorizedOptions; shortcuts?: CategorizedShortcuts }
    | { useCategories?: false; options: FlatOptions; shortcuts?: FlatShortcuts };

// TO DO: rewrite to use a global shortcuts manager instead, to allow certain shortcuts to be prioritized and prevent conflicts
/**
 * Creates listeners for keyboard shortcuts.
 */
export function useShortcuts(params: UseShortcutsParams) {
	const [activeKeys, setActiveKeys] = useState<string[]>([]);

	const checkShortcuts = useCallback((event: KeyboardEvent, allowExecution = true) => {
		if (!params.shortcuts) return;

		const keys = [...activeKeys];

		const checkGroup = (group: FlatShortcuts, category?: string) => {
			for (const [name, shortcut] of Object.entries(group)) {
				const active = shortcut.every(
					(key) => keys.includes(key) || event.key === key
				);
				if (!active) continue;

				event.preventDefault();
				event.stopPropagation();

				if (!shortcut.includes(event.key) || !allowExecution) continue;

				if (category != null) {
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					(params.options as CategorizedOptions)[category]?.[name]?.(event);
				} else {
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					(params.options as FlatOptions)[name]?.(event);
				}
			}
		};

		if (params.useCategories) {
			for (const [category, group] of Object.entries(params.shortcuts)) {
				checkGroup(group, category);
			}
		} else {
			checkGroup(params.shortcuts);
		}

		setActiveKeys(keys);
	}, [activeKeys, params]);

	useEffect(() => {
		const onBlur = () => setActiveKeys([]);
		document.addEventListener("blur", onBlur);
		return () => document.removeEventListener("blur", onBlur);
	}, []);

	const onKeyDown = (event: KeyboardEvent) => {
		const isRepeated = activeKeys.includes(event.key);
		checkShortcuts(event, isRepeated);
		if (!isRepeated) setActiveKeys(activeKeys.concat([event.key]));
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