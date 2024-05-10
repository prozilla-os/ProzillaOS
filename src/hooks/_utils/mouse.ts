import { useEffect } from "react";

interface UseMouseListenerParams {
	onMouseDown: EventListener;
	onMouseUp: EventListener;
	onClick: EventListener;
	onContextMenu: EventListener;
}

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