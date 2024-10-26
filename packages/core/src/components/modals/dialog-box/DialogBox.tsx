import { ModalsConfig } from "../../../features/system/configs";
import { WindowedModal } from "../_utils/WindowedModal";
import { ModalProps } from "../ModalView";
import styles from "./DialogBox.module.css";

export function DialogBox({ modal, params, children, ...props }: ModalProps) {
	const onClick = (event: MouseEvent) => {
		event.preventDefault();
		const attribute = (event.target as HTMLElement).getAttribute("data-type");
		if (attribute == null) return;

		const type = parseInt(attribute);

		switch (type) {
			case ModalsConfig.DIALOG_CONTENT_TYPES.closeButton:
				modal?.close();
				break;
		}
	};

	return <WindowedModal modal={modal} params={params} onClick={onClick} {...props}>
		<div className={styles.DialogContent}>
			{children}
		</div>
	</WindowedModal>;
}