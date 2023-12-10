import { useCallback } from "react";
import Modal from "../../features/modals/modal.js";
import { DialogBox } from "../../components/modals/dialog-box/DialogBox.jsx";
import Vector2 from "../../features/math/vector2.js";
import { DEFAULT_DIALOG_SIZE } from "../../constants/modals.js";

export function useDialogBox({ modalsManager }) {
	const onDialogBox = useCallback((event, params = {}) => {
		const size = params.size ?? DEFAULT_DIALOG_SIZE;
		let positionX = (window.innerWidth - size.x) / 4;
		let positionY = (window.innerHeight - size.y) / 4;

		if (modalsManager.containerRef?.current) {
			const containerRect = modalsManager.containerRef.current.getBoundingClientRect();
			positionX -= containerRect.x / 2;
			positionY -= containerRect.y / 2;
		}

		const newModal = new Modal(DialogBox)
			.setPosition(new Vector2(positionX, positionY))
			.setSize(size)
			.setDismissible(false)
			.setProps({ params });

		modalsManager.open(newModal);
		return newModal;
	}, [modalsManager]);

	return { onDialogBox };
}