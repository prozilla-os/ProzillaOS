import { FC, useCallback } from "react";
import { useModalsManager } from "./modalsManagerContext";
import { ModalProps } from "../../components/modals/ModalView";
import { Modal } from "../../features/modals/modal";
import { Vector2 } from "../../features";
import { useSystemManager } from "../system/systemManagerContext";
import { WindowProps } from "../../components";

export interface OpenWindowedModalParams {
	/** The ID of the associated app. */
	appId?: string;
	/** The URL of the icon of the modal. */
	iconUrl?: string;
	/** The title of the modal. */
	title?: string;
	/** The size of the modal. */
	size: Vector2;
	/** The modal component. */
	Modal: FC<ModalProps>;
	single?: boolean;
	fullscreen?: WindowProps["fullscreen"];
}
export type OpenWindowedModal = (params: OpenWindowedModalParams) => Modal;

export function useWindowedModal(): { openWindowedModal: OpenWindowedModal; } {
	const { modalsConfig } = useSystemManager();
	const modalsManager = useModalsManager();

	const openWindowedModal = useCallback<OpenWindowedModal>(({ Modal: WindowedModal, ...params }) => {
		const size = params.size ?? modalsConfig.defaultDialogSize;
		let positionX = (window.innerWidth - size.x) / 4;
		let positionY = (window.innerHeight - size.y) / 4;

		if (modalsManager?.containerRef?.current) {
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

		modalsManager?.open(newModal, single);
		return newModal;
	}, [modalsManager]);

	return { openWindowedModal };
}