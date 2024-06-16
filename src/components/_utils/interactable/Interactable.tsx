import { MouseEventHandler, ReactNode, useState } from "react";
import { INTERACTIBLE_DOUBLE_CLICK_DELAY } from "../../../config/utils.config";

let timeoutId: NodeJS.Timeout | null = null;

interface InteractableProps {
	onClick: Function;
	onDoubleClick: Function;
	children: ReactNode;
	[key: string]: unknown;
}

export function Interactable({ onClick, onDoubleClick, children, ...props }: InteractableProps) {
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

		timeoutId = setTimeout(() => {
			setClicked(false);
		}, INTERACTIBLE_DOUBLE_CLICK_DELAY);
	};

	return <button {...props} onClick={onButtonClick as unknown as MouseEventHandler}>
		{children}
	</button>;
}