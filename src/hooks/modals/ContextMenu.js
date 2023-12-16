import { useCallback } from "react";
import Vector2 from "../../features/math/vector2.js";
import Modal from "../../features/modals/modal.js";
import ModalsManager from "../../features/modals/modals.js";
import { STYLES } from "../../components/actions/Actions.jsx";

/**
 * @callback onContextMenuType
 * @param {object} event
 * @param {object} params
 * @returns {Modal}
 */

/**
 * @param {object} props 
 * @param {ModalsManager} props.modalsManager
 * @param {import("../../components/actions/Actions.jsx").actionsType} props.Actions
 * @returns {{
 * 	onContextMenu: onContextMenuType,
 * 	ShortcutsListener: import("../../components/actions/Actions.jsx").actionsType
 * }}
 */
export function useContextMenu({ modalsManager, Actions }) {
	// Open a new modal when context menu is triggered
	const onContextMenu = useCallback((event, params = {}) => {
		event.preventDefault();
		event.stopPropagation();

		let positionX = (event?.clientX ?? 0);
		let positionY = (event?.clientY ?? 0);

		if (modalsManager.containerRef?.current) {
			const containerRect = modalsManager.containerRef.current.getBoundingClientRect();
			positionX -= containerRect.x;
			positionY -= containerRect.y / 2;
		}

		const newModal = new Modal(Actions)
			.setPosition(new Vector2(positionX, positionY))
			.setProps({
				triggerParams: params,
				className: STYLES.CONTEXT_MENU,
				onAnyTrigger: () => {
					newModal.close();
				}
			});

		modalsManager.open(newModal);
		return newModal;
	}, [Actions, modalsManager]);

	const ShortcutsListener = () => <><Actions className={STYLES.SHORTCUTS_LISTENER}/></>;

	return { onContextMenu, ShortcutsListener };
}