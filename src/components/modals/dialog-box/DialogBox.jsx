import { DIALOG_CONTENT_TYPES } from "../../../config/modals.config.js";
import { WindowedModal } from "../_utils/WindowedModal.jsx";

export function DialogBox({ modal, params, children, ...props }) {
	const onClick = (event) => {
		event.preventDefault();
		const type = parseInt(event.target.getAttribute("data-type"));

		switch (type) {
			case DIALOG_CONTENT_TYPES.CloseButton:
				modal.close();
				break;
		}
	};

	return <WindowedModal modal={modal} params={params} onClick={onClick} {...props}>
		{children}
	</WindowedModal>;
}