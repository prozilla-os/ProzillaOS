import { useCallback } from "react";
import { DialogBox } from "../../components/modals/dialog-box/DialogBox.jsx";
import { DIALOG_CONTENT_TYPES } from "../../config/modals.config.js";
import Vector2 from "../../features/math/vector2.js";
import { useWindowedModal } from "./windowedModal.js";

/**
 * @typedef alertType
 * @param {object} options
 * @param {string} options.title
 * @param {string} options.text
 * @param {string} options.iconUrl
 */

/**
 * @returns {{ alert: alertType }}
 */
export function useAlert() {
	const { openWindowedModal } = useWindowedModal();

	const alert = useCallback(({ title, text, iconUrl, size, single }) => {
		openWindowedModal({
			title: title ?? "Alert",
			iconUrl,
			size: size ?? new Vector2(300, 150),
			single,
			Modal: (props) =>
				<DialogBox {...props}>
					<p>{text}</p>
					<button data-type={DIALOG_CONTENT_TYPES.CloseButton}>Ok</button>
				</DialogBox>
		});
	}, [openWindowedModal]);
	
	return { alert };
}