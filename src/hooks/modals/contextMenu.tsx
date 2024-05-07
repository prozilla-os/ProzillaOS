import { FC, useCallback } from "react";
import Vector2 from "../../features/math/vector2";
import Modal from "../../features/modals/modal";
import { ActionsProps, STYLES } from "../../components/actions/Actions";
import { useModalsManager } from "./modalsManagerContext";
import { ModalProps } from "../../components/modals/ModalView";

/**
 * @callback onContextMenuType
 * @param {object} event
 * @param {object} params
 * @returns {Modal}
 */

/**
 * @param {object} props 
 * @param {import("../../components/actions/Actions.jsx").actionsType} props.Actions
 * @returns {{
 * 	onContextMenu: onContextMenuType,
 * 	ShortcutsListener: import("../../components/actions/Actions.jsx").actionsType
 * }}
 */

interface UseContextMenuParams {
	Actions: FC<ActionsProps>;
}

export function useContextMenu({ Actions }: UseContextMenuParams) {
	const modalsManager = useModalsManager();

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

		const newModal = new Modal(Actions as unknown as FC<ModalProps>)
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

	const ShortcutsListener = () => <Actions className={STYLES.SHORTCUTS_LISTENER}/>;

	return { onContextMenu, ShortcutsListener };
}