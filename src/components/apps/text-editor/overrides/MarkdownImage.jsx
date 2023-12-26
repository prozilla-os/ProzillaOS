import { useMemo } from "react";
import { VirtualFile } from "../../../../features/virtual-drive/file/virtualFile.js";
import ModalsManager from "../../../../features/modals/modalsManager.js";
import App from "../../../../features/apps/app.js";
import WindowsManager from "../../../../features/windows/windowsManager.js";

/**
 * @param {object} props 
 * @param {VirtualFile} props.currentFile 
 * @param {string} props.src 
 * @param {string} props.alt
 * @param {ModalsManager} props.modalsManager
 * @param {WindowsManager} props.windowsManager
 * @param {App} props.app
 */
export function MarkdownImage({ currentFile, alt, src, modalsManager, windowsManager, app, ...props }) {
	const source = useMemo(() => {
		if (src.startsWith("public")) {
			return src.replace(/^public\//g, `${process.env.PUBLIC_URL}/`);
		}

		return src;
	}, [src]);

	return <img
		alt={alt}
		{...props}
		src={source}
	/>;
}