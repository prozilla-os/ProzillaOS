import { useState } from "react";
import { INTERACTIBLE_DOUBLE_CLICK_DELAY } from "../../../constants/utils.js";

let timeoutId = null;

export function Interactable({ onClick, onDoubleClick, children, ...props }) {
	const [clicked, setClicked] = useState(false);

	const onButtonClick = (event) => {
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

	return <button {...props} onClick={onButtonClick}>
		{children}
	</button>;
}