import { FC, MouseEvent, useCallback } from "react";
import { ActionsProps } from "../../components/actions/Actions";
import { useModalsManager } from "./modalsManagerContext";
import { Modal } from "../../features/modals/modal";
import { ActionsManager } from "../../features/actions/actionsManager";
import { Vector2 } from "../../features";

export interface UseContextMenuParams {
	/** The component with the actions of the context menu. */
	Actions: FC<ActionsProps>;
}

export type ContextMenuHandler = (event: MouseEvent<HTMLElement, MouseEvent>, params?: object) => Modal;

export function useManualContextMenu() {
	const modalsManager = useModalsManager();

	const openContextMenu = useCallback((position: Vector2, Actions: FC<ActionsProps>, params: object = {}) => {
		const newModal = new Modal(Actions)
			.setPosition(position)
			.setProps({
				triggerParams: params,
				mode: ActionsManager.MODES.contextMenu,
				onAnyTrigger: () => {
					newModal.close();
				},
			});

		modalsManager?.open(newModal);
		return newModal;
	}, [modalsManager]);

	return { openContextMenu };
}

/**
 * Creates a function that handles the opening of a custom context menu and a component that listens for keyboard shortcuts.
 */
export function useContextMenu({ Actions }: UseContextMenuParams) {
	const modalsManager = useModalsManager();
	const { openContextMenu } = useManualContextMenu();

	// Open a new modal when context menu is triggered
	const onContextMenu: ContextMenuHandler = useCallback((event: MouseEvent<HTMLElement, MouseEvent>, params: object = {}) => {
		event.preventDefault();
		event.stopPropagation();

		let positionX = event?.clientX ?? 0;
		let positionY = event?.clientY ?? 0;

		if (modalsManager?.containerRef?.current != null) {
			const containerRect = modalsManager.containerRef.current.getBoundingClientRect();
			positionX -= containerRect.x;
			positionY -= containerRect.y / 2;
		}

		return openContextMenu(new Vector2(positionX, positionY), Actions, params);
	}, [Actions, modalsManager]);

	const ShortcutsListener = () => <Actions mode={ActionsManager.MODES.shortcutsListener}/>;

	return { onContextMenu, ShortcutsListener };
}