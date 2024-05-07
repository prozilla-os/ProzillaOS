import { useCallback } from "react";
import { DialogBox } from "../../components/modals/dialog-box/DialogBox";
import { DIALOG_CONTENT_TYPES } from "../../config/modals.config";
import Vector2 from "../../features/math/vector2";
import { useWindowedModal } from "./windowedModal";

interface AlertParams {
	title: string;
	text: string;
	iconUrl: string;
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
			Modal: (props) =>
				<DialogBox {...props}>
					<p>{text}</p>
					<button data-type={DIALOG_CONTENT_TYPES.CloseButton}>Ok</button>
				</DialogBox>
		});
	}, [openWindowedModal]);
	
	return { alert };
}