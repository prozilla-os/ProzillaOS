import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useKeyboardListener({ onKeyDown, onKeyUp, onKeyPress }) {
	useEffect(() => {
		if (onKeyDown)
			document.addEventListener("keydown", onKeyDown);
		if (onKeyUp)
			document.addEventListener("keyup", onKeyUp);
		if (onKeyPress)
			document.addEventListener("keypress", onKeyPress);

		return () => {
			if (onKeyDown)
				document.removeEventListener("keydown", onKeyDown);
			if (onKeyUp)
				document.removeEventListener("keyup", onKeyUp);
			if (onKeyPress)
				document.removeEventListener("keypress", onKeyPress);
		};
	}, [onKeyDown, onKeyUp, onKeyPress]);
}