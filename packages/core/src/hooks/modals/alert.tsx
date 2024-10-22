import { useCallback } from "react";
import { DialogBox } from "../../components/modals/dialog-box/DialogBox";
import { useWindowedModal } from "./windowedModal";
import { ModalProps } from "../../components/modals/ModalView";
import { ModalsConfig, Vector2 } from "../../features";

interface AlertParams {
	title: string;
	text: string;
	iconUrl?: string;
	size?: Vector2;
	single?: boolean;
}

export function useAlert() {
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