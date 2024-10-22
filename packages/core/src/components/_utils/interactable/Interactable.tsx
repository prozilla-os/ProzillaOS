import { MouseEventHandler, ReactNode, useState } from "react";
import { useSystemManager } from "../../../hooks";

let timeoutId: number | null = null;

interface InteractableProps {
	onClick?: (event: MouseEvent) => void;
	onDoubleClick?: (event: MouseEvent) => void;
	children: ReactNode;
	[key: string]: unknown;
}

export function Interactable({ onClick, onDoubleClick, children, ...props }: InteractableProps) {
	const { miscConfig } = useSystemManager();
	const [clicked, setClicked] = useState(false);

	const onButtonClick = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		if (timeoutId != null)
			clearTimeout(timeoutId);

		if (clicked) {
			setClicked(false);
			onDoubleClick?.(event);

			return;
		}

		setClicked(true);
		onClick?.(event);

		timeoutId = window.setTimeout(() => {
			setClicked(false);
		}, miscConfig.doubleClickDelay);
	};

	return <button {...props} onClick={onButtonClick as unknown as MouseEventHandler}>
		{children}
	</button>;
}