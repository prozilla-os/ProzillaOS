import { APPS } from "../../../config/apps.config";
import { WALLPAPERS } from "../../../config/desktop.config";
import AppsManager from "../../apps/appsManager";
import { VirtualFile, VirtualFileLink } from "../file";
import { VirtualFolder, VirtualFolderLink } from "../folder";
import { VirtualRoot } from "./virtualRoot";

/**
 * Loads default data on the virtual root
 */
export function loadDefaultData(virtualRoot: VirtualRoot) {
	const linkedPaths: Record<string, string> = {};
		
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
					}).createFile("theme", "xml", (file) => {
						file.setSource("/config/theme.xml");
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
					}).createFile("ProzillaOS", "png", (file) => {
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
					folder.createFileLink("info.md", (fileLink: VirtualFileLink) => {
						fileLink.setLinkedPath(linkedPaths.info);
					}).createFileLink("links.md", (fileLink: VirtualFileLink) => {
						fileLink.setLinkedPath(linkedPaths.links);
					}).createFolderLink("Pictures", (folderLink: VirtualFolderLink) => {
						folderLink.setLinkedPath(linkedPaths.images);
					}).createFolderLink("Documents", (folderLink: VirtualFolderLink) => {
						folderLink.setLinkedPath(linkedPaths.documents);
					});
				})
				.createFolder("Apps");
		});
	});

	loadTree(virtualRoot);	
}

// Create files and folders based on repository tree
function loadTree(virtualRoot: VirtualRoot) {
	const excludedFiles = [
		"/public/config/tree.json"
	];

	void fetch("/config/tree.json").then((response) => 
		response.json()
	).then(({ files, folders }: { files: string[], folders: string[] }) => {
		folders.forEach((folderPath) => {
			const lastSlashIndex = folderPath.lastIndexOf("/");

			if (lastSlashIndex === -1) {
				virtualRoot.createFolder(folderPath);
				return;
			}

			const parentPath = folderPath.substring(0, lastSlashIndex);
    		const folderName = folderPath.substring(lastSlashIndex + 1);

			const parentFolder = virtualRoot.navigate(parentPath) as VirtualFolder;
			parentFolder.createFolder(folderName);
		});

		files.forEach((filePath) => {
			if (excludedFiles.includes(filePath))
				return;

			const lastSlashIndex = filePath.lastIndexOf("/");

			const callback = (virtualFile: VirtualFile) => {
				const virtualPath = virtualFile.absolutePath;
				if (virtualPath.startsWith("/public/")) {
					virtualFile.setSource(virtualPath.replace(/^\/public\//, "/"));
				} else {
					virtualFile.setSource(`https://raw.githubusercontent.com/Prozilla/ProzillaOS/main${virtualPath}`);
				}
			};

			if (lastSlashIndex === -1) {
				const { name, extension } = VirtualFile.convertId(filePath);
				virtualRoot.createFile(name, extension, callback);
				return;
			}

			const parentPath = filePath.substring(0, lastSlashIndex);
    		const { name, extension } = VirtualFile.convertId(filePath.substring(lastSlashIndex + 1));

			const parentFolder = virtualRoot.navigate(parentPath) as VirtualFolder;
			parentFolder.createFile(name, extension, callback);
		});
	}).catch(() => {
		console.warn("Failed to load repository tree. Make sure the tree data is valid and up-to-date using 'npm run fetch'.");
	});
}