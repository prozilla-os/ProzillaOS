import { MouseEventHandler, ReactNode, useMemo } from "react";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { useContextMenu } from "../../../../hooks/modals/contextMenu";
import { Actions } from "../../../actions/Actions";
import { ClickAction } from "../../../actions/actions/ClickAction";
import { VirtualFile } from "../../../../features/virtual-drive/file";
import { useWindowedModal } from "../../../../hooks/modals/windowedModal";
import AppsManager from "../../../../features/apps/appsManager";
import App from "../../../../features/apps/app";
import { DialogBox } from "../../../modals/dialog-box/DialogBox";
import { DIALOG_CONTENT_TYPES } from "../../../../config/modals.config";
import Vector2 from "../../../../features/math/vector2";
import WindowsManager from "../../../../features/windows/windowsManager";
import { APPS } from "../../../../config/apps.config";

interface MarkdownLinkProps {
	href: string;
	children: ReactNode;
	windowsManager: WindowsManager;
	setCurrentFile: Function;
	currentFile: VirtualFile;
	app: App;
}

export function MarkdownLink({ href, children, windowsManager, currentFile, setCurrentFile, app, ...props }: MarkdownLinkProps) {
	const { openWindowedModal } = useWindowedModal();

	const onClick = (event: MouseEvent) => {
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

	const { onContextMenu } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Open link" icon={faExternalLink} onTrigger={onClick}/>
		</Actions>
	});

	const title = useMemo<string>(() => {
		let title: string = null;
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
		onClick={onClick as unknown as MouseEventHandler}
		{...props}
		title={title}
	>
		{children}
	</a>;
}