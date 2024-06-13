import { MarkdownProps } from "../../../../components/apps/text-editor/TextEditor";

export function sanitizeProps(props: MarkdownProps) {
	delete props.modalsManager;
	delete props.setCurrentFile;
	delete props.currentFile;
	delete props.app;
	delete props.windowsManager;
}