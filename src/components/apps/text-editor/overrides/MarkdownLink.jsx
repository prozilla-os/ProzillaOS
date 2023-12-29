import { useMemo } from "react";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { useContextMenu } from "../../../../hooks/modals/contextMenu.js";
import { Actions } from "../../../actions/Actions.jsx";
import { ClickAction } from "../../../actions/actions/ClickAction.jsx";
import ModalsManager from "../../../../features/modals/modalsManager.js";
import { VirtualFile } from "../../../../features/virtual-drive/file/virtualFile.js";
import { useWindowedModal } from "../../../../hooks/modals/windowedModal.js";
import AppsManager from "../../../../features/apps/appsManager.js";
import App from "../../../../features/apps/app.js";
import { DialogBox } from "../../../modals/dialog-box/DialogBox.jsx";
import { DIALOG_CONTENT_TYPES } from "../../../../config/modals.config.js";
import Vector2 from "../../../../features/math/vector2.js";
import WindowsManager from "../../../../features/windows/windowsManager.js";
import { APPS } from "../../../../config/apps.config.js";

/**
 * @param {object} props 
 * @param {string} props.href
 * @param {*} props.children
 * @param {ModalsManager} props.modalsManager
 * @param {WindowsManager} props.windowsManager
 * @param {Function} props.setCurrentFile
 * @param {VirtualFile} props.currentFile
 * @param {App} props.app
 */
export function MarkdownLink({ href, children, modalsManager, windowsManager, currentFile, setCurrentFile, app, ...props }) {
	const { openWindowedModal } = useWindowedModal({ modalsManager });

	const onClick = (event) => {
		event.preventDefault();

		if (!href.startsWith("http://") && !href.startsWith("https://")) {
			const target = currentFile.parent.navigate(href);
			if (target != null) {
				if (target.isFile()) {
					setCurrentFile(target);
				} else {
					windowsManager.open(APPS.FILE_EXPLORER, { startPath: target.path });
				}
			} else {
				openWindowedModal({
					iconUrl: AppsManager.getAppIconUrl(app.id),
					title: "Failed to open link",
					size: new Vector2(450, 150),
					Modal: (props) =>
						<DialogBox {...props}>
							<p>Target not found: "{href}"</p>
							<button data-type={DIALOG_CONTENT_TYPES.CloseButton}>Ok</button>
						</DialogBox>
				});
			}
		} else {
			window.open(href, "_blank").focus();
		}
	};

	const { onContextMenu } = useContextMenu({ modalsManager, Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open link" icon={faExternalLink} onTrigger={onClick}/>
		</Actions>
	});

	const title = useMemo(() => {
		let title = null;
		try {
			title = new URL(href).hostname;
		} catch (error) {
			title = href.split("/").pop();
		}
		return title;
	}, [href]);

	return <a
		target="_blank"
		rel="noreferrer"
		href={href}
		onContextMenu={onContextMenu}
		onClick={onClick}
		{...props}
		title={title}
	>
		{children}
	</a>;
}