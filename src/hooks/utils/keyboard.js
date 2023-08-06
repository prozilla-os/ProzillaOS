import { useEffect } from "react";

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