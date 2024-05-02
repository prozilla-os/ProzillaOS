import { useCallback } from "react";
import { DialogBox } from "../../components/modals/dialog-box/DialogBox.jsx";
import { DIALOG_CONTENT_TYPES } from "../../config/modals.config.js";
import Vector2 from "../../features/math/vector2.js";
import { useWindowedModal } from "./windowedModal.js";
import ModalsManager from "../../features/modals/modalsManager.js";

/**
 * @typedef alertType
 * @param {object} options
 * @param {string} options.title
 * @param {string} options.text
 * @param {string} options.iconUrl
 */

/**
 * @param {object} props 
 * @param {ModalsManager} props.modalsManager
 * @returns {{ alert: alertType }}
 */
export function useAlert({ modalsManager }) {
	const { openWindowedModal } = useWindowedModal({ modalsManager });

	const alert = useCallback(({ title, text, iconUrl }) => {
		openWindowedModal({
			title: title ?? "Alert",
			iconUrl,
			size: new Vector2(300, 150),
			Modal: (props) =>
				<DialogBox {...props}>
					<p>{text}</p>
					<button data-type={DIALOG_CONTENT_TYPES.CloseButton}>Ok</button>
				</DialogBox>
		});
	}, [openWindowedModal]);
	
	return { alert };
}