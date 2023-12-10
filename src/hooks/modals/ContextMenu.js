import { useCallback } from "react";
import { ContextMenu } from "../../components/modals/context-menu/ContextMenu.jsx";
import Vector2 from "../../features/math/vector2.js";
import Modal from "../../features/modals/modal.js";
import ModalsManager from "../../features/modals/modals.js";
import { useShortcuts } from "../utils/keyboard.js";

/**
 * @typedef {Function} onContextMenuType
 * @param {object} event
 * @param {object} params
 * @returns {Modal}
 */

/**
 * @param {object} props 
 * @param {ModalsManager} props.modalsManager
 * @param {Object<string, Object<string, Function>>} props.options
 * @param {Object<string, Object<string, string[]>>} props.shortcuts
 * @returns {{ onContextMenu: onContextMenuType }}
 */
export function useContextMenu({ modalsManager, options, shortcuts }) {
	// Open a new modal when context menu is triggered
	const onContextMenu = useCallback((event, params = {}) => {
		let positionX = (event?.clientX ?? 0);
		let positionY = (event?.clientY ?? 0);

		if (modalsManager.containerRef?.current) {
			const containerRect = modalsManager.containerRef.current.getBoundingClientRect();
			positionX -= containerRect.x;
			positionY -= containerRect.y / 2;
		}

		const newModal = new Modal(ContextMenu)
			.setPosition(new Vector2(positionX, positionY))
			.setProps({ options, shortcuts, params });

		modalsManager.open(newModal);
		return newModal;
	}, [modalsManager, options, shortcuts]);

	useShortcuts({ options, shortcuts, useCategories: false });

	return { onContextMenu };
}