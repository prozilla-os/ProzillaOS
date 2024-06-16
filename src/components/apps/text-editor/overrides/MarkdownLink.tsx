import { MouseEventHandler, ReactNode, useMemo } from "react";
import { faClipboard, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { useContextMenu } from "../../../../hooks/modals/contextMenu";
import { Actions } from "../../../actions/Actions";
import { ClickAction } from "../../../actions/actions/ClickAction";
import { useWindowedModal } from "../../../../hooks/modals/windowedModal";
import { AppsManager } from "../../../../features/apps/appsManager";
import { DialogBox } from "../../../modals/dialog-box/DialogBox";
import { DIALOG_CONTENT_TYPES } from "../../../../config/modals.config";
import { Vector2 } from "../../../../features/math/vector2";
import { APPS } from "../../../../config/apps.config";
import { MarkdownProps } from "../TextEditor";
import { sanitizeProps } from "../../../../features/apps/text-editor/_utils/sanitizeProps";
import { copyToClipboard, removeUrlProtocol } from "../../../../features/_utils/browser.utils";
import { TextDisplay } from "../../../actions/actions/TextDisplay";
import styles from "../TextEditor.module.css";
import { ModalProps } from "../../../modals/ModalView";

interface MarkdownLinkProps extends MarkdownProps {
	href: string;
	children: ReactNode;
}

export function MarkdownLink({ href, children, windowsManager, currentFile, setCurrentFile, app, ...props }: MarkdownLinkProps) {
	const { openWindowedModal } = useWindowedModal();

	const onClick = (event: MouseEvent) => {
		event.preventDefault();

		if (!href.startsWith("http://") && !href.startsWith("https://")) {
			const target = currentFile.parent?.navigate(href);
			if (target != null) {
				if (target.isFile()) {
					setCurrentFile(target);
				} else {
					windowsManager.open(APPS.FILE_EXPLORER, { path: target.path });
				}
			} else {
				openWindowedModal({
					iconUrl: AppsManager.getAppIconUrl(app.id),
					title: "Failed to open link",
					size: new Vector2(450, 150),
					Modal: (props: ModalProps) =>
						<DialogBox {...props}>
							<p>Target not found: "{href}"</p>
							<button data-type={DIALOG_CONTENT_TYPES.closeButton}>Ok</button>
						</DialogBox>
				});
			}
		} else {
			window.open(href, "_blank")?.focus();
		}
	};

	const { onContextMenu } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<TextDisplay>{removeUrlProtocol(href)}</TextDisplay>
			<ClickAction label="Open link" icon={faExternalLink} onTrigger={(event) => {
				onClick(event as MouseEvent);
			}}/>
			<ClickAction label="Copy link" icon={faClipboard} onTrigger={() => {
				copyToClipboard(href);
			}}/>
		</Actions>
	});

	const title = useMemo<string>(() => {
		let title: string = "";
		try {
			title = new URL(href).hostname;
		} catch (error) {
			title = href.split("/").pop() ?? "";
		}
		return title;
	}, [href]);

	sanitizeProps(props);

	return <a
		{...props}
		className={styles.MarkdownLink}
		target="_blank"
		rel="noreferrer"
		href={href}
		onContextMenu={onContextMenu as unknown as MouseEventHandler}
		onClick={onClick as unknown as MouseEventHandler}
		title={title}
	>
		{children}
	</a>;
}