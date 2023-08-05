import { createContext, useContext } from "react";
import { VirtualRoot } from "../../features/virtual-drive/virtual-root.js";

const VirtualRootContext = createContext();

/**
 * Initializes the virtual root with folders and files
 * @param {VirtualRoot} virtualRoot 
 */
function initVirtualRoot(virtualRoot) {
	virtualRoot.setAlias("/");

	virtualRoot.createFolder("bin", (folder) => {
		folder.createFiles([
			{ name: "echo" },
			{ name: "cd" },
			{ name: "ls" },
			{ name: "clear" },
		]);
	});

	virtualRoot.createFolder("dev", (folder) => {
		folder.createFiles([
			{ name: "null" },
			{ name: "zero" },
			{ name: "random" },
		]);
	});

	virtualRoot.createFolder("etc");

	virtualRoot.createFolder("usr", (folder) => {
		folder.createFolders(["bin", "sbin", "lib", "share"]);
	});
		

	virtualRoot.createFolder("home", (folder) => {
		folder.createFolder("prozilla-os", (folder) => {
			folder.setAlias("~")
				.createFolder(".config", (folder) => {
					folder.createFile("desktop", "xml", (file) => {
						file.setSource("/config/desktop.xml");
					});
				})
				.createFolder("Images", (folder) => {
					folder.createFile("Wallpaper1", "png", (file) => {
						file.setSource("/media/wallpapers/Wallpaper1.png")
					}).createFile("Wallpaper2", "png", (file) => {
						file.setSource("/media/wallpapers/Wallpaper2.png")
					}).createFile("Wallpaper3", "png", (file) => {
						file.setSource("/media/wallpapers/Wallpaper3.png")
					}).createFile("Wallpaper4", "png", (file) => {
						file.setSource("/media/wallpapers/Wallpaper4.png")
					});
				})
				.createFolder("Documents", (folder) => {
					folder.createFile("text", "txt", (file) => {
						file.setContent("Hello world!");
					}).createFile("info", "md", (file) => {
						file.setSource("/documents/info.md");
					});
				})
				.createFolder("Desktop");
		});
	});

	virtualRoot.createFolder("lib");
	virtualRoot.createFolder("sbin");
	virtualRoot.createFolder("tmp");
	virtualRoot.createFolder("var");
	virtualRoot.createFolder("boot");

	virtualRoot.createFolder("proc", (folder) => {
		folder.createFiles([
			{ name: "cpuinfo" },
			{ name: "meminfo" },
		]);
	});

	virtualRoot.createFolder("var");
	virtualRoot.createFolder("opt");
	virtualRoot.createFolder("media");
	virtualRoot.createFolder("mnt");
	virtualRoot.createFolder("srv");
}

/**
 * @returns {React.Provider<VirtualRoot>}
 */
export function VirtualRootProvider({ children }) {
	const virtualRoot = new VirtualRoot();

	initVirtualRoot(virtualRoot);

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