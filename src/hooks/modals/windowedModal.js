import { useCallback } from "react";
import Modal from "../../features/modals/modal.js";
import Vector2 from "../../features/math/vector2.js";
import { DEFAULT_DIALOG_SIZE } from "../../config/modals.config.js";
import { useModalsManager } from "./modalsManagerContext.js";

/**
 * @callback windowedModalType
 * @param {object} props
 */

/**
 * @callback openWindowedModalType
 * @param {object} params
 * @param {string} params.iconUrl
 * @param {string} params.title
 * @param {Vector2} params.size
 * @param {windowedModalType} params.Modal
 * @returns {Modal}
 */

/**
 * @returns {{ openWindowedModal: openWindowedModalType }}
 */
export function useWindowedModal() {
	const modalsManager = useModalsManager();

	const openWindowedModal = useCallback(({ Modal: WindowedModal, ...params }) => {
		const size = params.size ?? DEFAULT_DIALOG_SIZE;
		let positionX = (window.innerWidth - size.x) / 4;
		let positionY = (window.innerHeight - size.y) / 4;

		if (modalsManager.containerRef?.current) {
			const containerRect = modalsManager.containerRef.current.getBoundingClientRect();
			positionX -= containerRect.x / 2;
			positionY -= containerRect.y / 2;
		}

		const newModal = new Modal(WindowedModal)
			.setPosition(new Vector2(positionX, positionY))
			.setSize(size)
			.setDismissible(false)
			.setProps({ params });

		const single = params.single ?? false;

		modalsManager.open(newModal, single);
		return newModal;
	}, [modalsManager]);

	return { openWindowedModal };
}