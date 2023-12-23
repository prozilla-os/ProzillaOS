import { APPS } from "../../../config/apps.config.js";
import { WALLPAPERS } from "../../../config/desktop.config.js";
import AppsManager from "../../apps/appsManager.js";
import { VirtualRoot } from "./virtualRoot.js";

/**
 * Loads default data on the virtual root
 * @param {VirtualRoot} virtualRoot 
 */
export function loadDefaultData(virtualRoot) {
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

	const linkedPaths = {};
		
	virtualRoot.createFolder("home", (folder) => {
		folder.createFolder("prozilla-os", (folder) => {
			folder.setAlias("~")
				.createFolder(".config", (folder) => {
					folder.createFile("desktop", "xml", (file) => {
						file.setSource("/config/desktop.xml");
					}).createFile("taskbar", "xml", (file) => {
						file.setSource("/config/taskbar.xml");
					}).createFile("apps", "xml", (file) => {
						file.setSource("/config/apps.xml");
					});
				})
				.createFolder("Pictures", (folder) => {
					folder.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-images"));
					folder.createFolder("Wallpapers", (folder) => {
						folder.setProtected(true);
						for (let i = 0; i < WALLPAPERS.length; i++) {
							const source = WALLPAPERS[i];
							folder.createFile(`Wallpaper${i + 1}`, "png", (file) => {
								file.setSource(source);
							});
						}
					}).createFile("Prozilla-OS", "png", (file) => {
						file.setSource("/assets/banner-logo-title.png");
					}).createFolder("Crumbling City", (folder) => {
						folder.createFile("Japan", "png", (file) => {
							file.setSource("https://daisygames.org/media/Games/Crumbling%20City/CrumblingCityRelease.png");
						}).createFile("City Center", "png", (file) => {
							file.setSource("https://daisygames.org/media/Games/Crumbling%20City/Screenshot_City_Firegun.png");
						}).createFile("Farms", "png", (file) => {
							file.setSource("https://daisygames.org/media/Games/Crumbling%20City/Screenshot_Farms_Hammer.png");
						});
					});
					linkedPaths.images = folder.path;
				})
				.createFolder("Documents", (folder) => {
					folder.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "folder-text"));
					folder.createFile("text", "txt", (file) => {
						file.setContent("Hello world!");
					}).createFile("info", "md", (file) => {
						file.setProtected(true)
							.setSource("/documents/info.md")
							.setIconUrl(AppsManager.getAppIconUrl(APPS.FILE_EXPLORER, "file-info"));
						linkedPaths.info = file.path;
					}).createFile("links", "md", (file) => {
						file.setProtected(true)
							.setSource("/documents/links.md");
						linkedPaths.links = file.path;
					});
					linkedPaths.documents = folder.path;
				})
				.createFolder("Desktop", (folder) => {
					folder.createFileLink("info.md", (fileLink) => {
						fileLink.setLinkedPath(linkedPaths.info);
					}).createFileLink("links.md", (fileLink) => {
						fileLink.setLinkedPath(linkedPaths.links);
					}).createFolderLink("Pictures", (folderLink) => {
						folderLink.setLinkedPath(linkedPaths.images);
					}).createFolderLink("Documents", (folderLink) => {
						folderLink.setLinkedPath(linkedPaths.documents);
					});
				});
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