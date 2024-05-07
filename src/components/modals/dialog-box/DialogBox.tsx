import { DIALOG_CONTENT_TYPES } from "../../../config/modals.config";
import { WindowedModal } from "../_utils/WindowedModal";
import { ModalProps } from "../ModalView";
import styles from "./DialogBox.module.css";

export function DialogBox({ modal, params, children, ...props }: ModalProps) {
	const onClick = (event: MouseEvent) => {
		event.preventDefault();
		const type = parseInt((event.target as HTMLElement).getAttribute("data-type"));

		switch (type) {
			case DIALOG_CONTENT_TYPES.CloseButton:
				modal.close();
				break;
		}
	};

	return <WindowedModal modal={modal} params={params} onClick={onClick} {...props}>
		<div className={styles["Dialog-content"]}>
			{children}
		</div>
	</WindowedModal>;
}