import { FC, MouseEvent, useCallback } from "react";
import { ActionsProps } from "../../components/actions/Actions";
import { useModalsManager } from "./modalsManagerContext";
import { ModalProps } from "../../components/modals/ModalView";
import { Modal } from "../../features/modals/modal";
import { ActionsManager } from "../../features/actions/actionsManager";
import { Vector2 } from "../../features";

export interface UseContextMenuParams {
	/** The component with the actions of the context menu. */
	Actions: FC<ActionsProps>;
}

/**
 * Creates a function that handles the opening of a custom context menu and a component that listens for keyboard shortcuts.
 */
export function useContextMenu({ Actions }: UseContextMenuParams) {
	const modalsManager = useModalsManager();

	// Open a new modal when context menu is triggered
	const onContextMenu = useCallback((event: MouseEvent<HTMLElement, MouseEvent>, params: object = {}) => {
		event.preventDefault();
		event.stopPropagation();

		let positionX = event?.clientX ?? 0;
		let positionY = event?.clientY ?? 0;

		if (modalsManager?.containerRef?.current != null) {
			const containerRect = modalsManager.containerRef.current.getBoundingClientRect();
			positionX -= containerRect.x;
			positionY -= containerRect.y / 2;
		}

		const newModal = new Modal(Actions as unknown as FC<ModalProps>)
			.setPosition(new Vector2(positionX, positionY))
			.setProps({
				triggerParams: params,
				mode: ActionsManager.MODES.contextMenu,
				onAnyTrigger: () => {
					newModal.close();
				},
			});

		modalsManager?.open(newModal);
		return newModal;
	}, [Actions, modalsManager]);

	const ShortcutsListener = () => <Actions mode={ActionsManager.MODES.shortcutsListener}/>;

	return { onContextMenu, ShortcutsListener };
}