export function sanitizeProps(props: Record<string, unknown>) {
	delete props.modalsManager;
	delete props.setCurrentFile;
	delete props.currentFile;
	delete props.app;
	delete props.windowsManager;
}