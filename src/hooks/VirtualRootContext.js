import { createContext, useContext } from "react";
import { VirtualRoot } from "../features/virtual-drive/virtual-root.js";

const VirtualRootContext = createContext();

/**
 * @returns {React.Provider<VirtualRoot>}
 */
export function VirtualRootProvider({ children }) {
	const virtualRoot = new VirtualRoot().setAlias("/");

	virtualRoot.createFolder("bin");
	virtualRoot.createFolder("dev");
	virtualRoot.createFolder("etc");
	virtualRoot.createFolder("usr");
	virtualRoot.createFolder("home").createFolder("prozilla-os").setAlias("~");
	virtualRoot.createFolder("lib");
	virtualRoot.createFolder("sbin");
	virtualRoot.createFolder("tmp");
	virtualRoot.createFolder("var");

	console.log(virtualRoot.subFolders);

	return (
		<VirtualRootContext.Provider value={virtualRoot}>
			{children}
		</VirtualRootContext.Provider>
	);
}

/**
 * @returns {VirtualRoot}
 */
export function useVirtualRoot() {
	return useContext(VirtualRootContext);
}