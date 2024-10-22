import { MouseEventHandler, ReactNode, useMemo } from "react";
import { faClipboard, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { MarkdownProps } from "../TextEditor";
import styles from "../TextEditor.module.css";
import { Actions, ClickAction, copyToClipboard, DialogBox, ModalProps, ModalsConfig, removeUrlProtocol, TextDisplay, useContextMenu, useWindowedModal, Vector2, VirtualFile } from "@prozilla-os/core";
import { sanitizeProps } from "../../core/_utils/sanitizeProps";

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
					setCurrentFile(target as VirtualFile);
				} else {
					windowsManager.open("file-explorer", { path: target.path });
				}
			} else {
				openWindowedModal({
					iconUrl: app?.iconUrl as string | undefined,
					title: "Failed to open link",
					size: new Vector2(450, 150),
					Modal: (props: ModalProps) =>
						<DialogBox {...props}>
							<p>Target not found: "{href}"</p>
							<button data-type={ModalsConfig.DIALOG_CONTENT_TYPES.closeButton}>Ok</button>
						</DialogBox>,
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
		</Actions>,
	});

	const title = useMemo<string>(() => {
		let title: string = "";
		try {
			title = new URL(href).hostname;
		} catch (_error) {
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