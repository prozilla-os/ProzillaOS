import { useEffect, useState } from "react";
import App from "../../features/apps/app";
import { VirtualFolder } from "../../features/virtual-drive/folder";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext";

export function useAppFolder(app: App): VirtualFolder {
	const virtualRoot = useVirtualRoot();
	const [folder, setFolder] = useState<VirtualFolder>(null);

	useEffect(() => {
		if (folder != null)
			return;

		const parentFolder = virtualRoot.navigate("~/Apps") as VirtualFolder;

		if (parentFolder == null) {
			console.warn("Folder missing: '~/Apps'");
			return;
		}

		parentFolder.createFolder(app.id, (newFolder) => {
			setFolder(newFolder);
		});
	}, [virtualRoot]);

	return folder;
}