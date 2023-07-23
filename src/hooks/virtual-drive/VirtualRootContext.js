import { createContext, useContext } from "react";
import { VirtualRoot } from "../../features/virtual-drive/virtual-root.js";

const VirtualRootContext = createContext();

/**
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
				.createFolder("Images", (folder) => {
					folder.createFile("Wallpaper_1", "png", (file) => {
						file.setSource("/public/media/wallpapers/wallpaper-1.png")
					}).createFile("Wallpaper_2", "png", (file) => {
						file.setSource("/public/media/wallpapers/wallpaper-2.png")
					}).createFile("Wallpaper_3", "png", (file) => {
						file.setSource("/public/media/wallpapers/wallpaper-3.png")
					}).createFile("Wallpaper_4", "png", (file) => {
						file.setSource("/public/media/wallpapers/wallpaper-4.png")
					})
				})
				.createFolder("Documents")
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