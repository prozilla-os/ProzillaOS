import { useCallback } from "react";
import { DialogBox } from "../../components/modals/dialog-box/DialogBox";
import { useWindowedModal } from "./windowedModal";
import { ModalProps } from "../../components/modals/ModalView";
import { ModalsConfig, Vector2 } from "../../features";

export interface AlertParams {
	/**
	 * The title of the alert.
	 * @default "Alert"
	 */
	title: string;
	/** The body of the alert. */
	text: string;
	/** The URL of the icon of the alert. */
	iconUrl?: string;
	/**
	 * The size of the alert modal.
	 * @default new Vector2(300, 150)
	 */
	size?: Vector2;
	single?: boolean;
}

/** Returns a function that opens an alert modal. */
export function useAlert(): { alert: (params: AlertParams) => void } {
	const { openWindowedModal } = useWindowedModal();

	const alert = useCallback(({ title, text, iconUrl, size, single }: AlertParams) => {
		openWindowedModal({
			title: title ?? "Alert",
			iconUrl,
			size: size ?? new Vector2(300, 150),
			single,
			Modal: (props: ModalProps) =>
				<DialogBox {...props}>
					<p>{text}</p>
					<button data-type={ModalsConfig.DIALOG_CONTENT_TYPES.closeButton}>Ok</button>
				</DialogBox>,
		});
	}, [openWindowedModal]);
	
	return { alert };
}