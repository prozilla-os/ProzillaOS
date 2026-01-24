import { useEffect } from "react";

export interface UseMouseListenerParams {
	/** Function that handles `"mousedown"` events */
	onMouseDown: EventListener;
	/** Function that handles `"mouseup"` events */
	onMouseUp: EventListener;
	/** Function that handles `"click"` events */
	onClick: EventListener;
	/** Function that handles `"contextmenu"` events */
	onContextMenu: EventListener;
}

/**
 * Creates listeners for `"mousedown"`, `"mouseup"`, `"click"` and `"contextmenu"` events
 */
export function useMouseListener({ onMouseDown, onMouseUp, onClick, onContextMenu }: UseMouseListenerParams) {
	useEffect(() => {
		if (onMouseDown)
			document.addEventListener("mousedown", onMouseDown);
		if (onMouseUp)
			document.addEventListener("mouseup", onMouseUp);
		if (onClick)
			document.addEventListener("click", onClick);
		if (onContextMenu)
			document.addEventListener("contextmenu", onContextMenu);

		return () => {
			if (onMouseDown)
				document.removeEventListener("mousedown", onMouseDown);
			if (onMouseUp)
				document.removeEventListener("mouseup", onMouseUp);
			if (onClick)
				document.removeEventListener("click", onClick);
			if (onContextMenu)
				document.removeEventListener("contextmenu", onContextMenu);
		};
	}, [onMouseDown, onMouseUp, onClick, onContextMenu]);
}