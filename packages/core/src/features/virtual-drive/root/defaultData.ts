import { SystemManager } from "../../system/systemManager";
import { VirtualFile, VirtualFileLink } from "../file";
import { VirtualFolder, VirtualFolderLink } from "../folder";
import { VirtualRoot } from "./virtualRoot";

/**
 * Loads default data on the virtual root
 */
export function loadDefaultData(systemManager: SystemManager, virtualRoot: VirtualRoot) {
	const { skin, appsConfig } = systemManager;
	const linkedPaths: Record<string, string> = {};
	
	virtualRoot.createFolder("home", (folder) => {
		folder.createFolder("prozilla-os", (folder) => {
			folder.setAlias("~")
				.createFolder(".config", (folder) => {
					folder.createFile("desktop", "xml", (file) => {
						file.setContent([
							"<options>",
							`	<wallpaper>${skin.defaultWallpaper}</wallpaper>`,
							"	<show-icons>true</show-icons>",
							"</options>",
						]);
					}).createFile("taskbar", "xml", (file) => {
						file.setContent([
							"<options>",
							`	<pins>${appsConfig.apps.filter((app) => app.pinnedByDefault).map(({ id }) => id).join(",")}</pins>`,
							"</options>",
						]);
					}).createFile("apps", "xml", (file) => {
						file.setContent([
							"<options>",
							`	<startup>${appsConfig.apps.filter((app) => app.launchAtStartup).map(({ id }) => id).join(",")}</startup>`,
							"</options>",
						]);
					}).createFile("theme", "xml", (file) => {
						file.setContent("<options><theme>0</theme></options>");
					});
				})
				.createFolder("Pictures", (folder) => {
					folder.setIconUrl(skin.folderIcons.images ?? skin.folderIcons.generic);
					folder.createFolder("Wallpapers", (folder) => {
						folder.setProtected(true);
						for (let i = 0; i < skin.wallpapers.length; i++) {
							const source = skin.wallpapers[i];
							folder.createFile(`Wallpaper${i + 1}`, "png", (file) => {
								file.setSource(source);
							});
						}
					}).createFile("ProzillaOS", "png", (file) => {
						file.setSource("/assets/banner-logo-title.png");
					}).createFile("Icon", "svg", (file) => {
						file.setSource("/icon.svg");
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
					folder.setIconUrl(skin.folderIcons.text ?? skin.folderIcons.generic);
					folder.createFile("text", "txt", (file) => {
						file.setContent("Hello world!");
					}).createFile("Info", "md", (file) => {
						file.setProtected(true)
							.setSource("/documents/info.md")
							.setIconUrl(skin.fileIcons.info ?? skin.fileIcons.generic);
						linkedPaths.info = file.path;
					}).createFile("Prozilla", "md", (file) => {
						file.setProtected(true)
							.setSource("/documents/prozilla.md");
						linkedPaths.links = file.path;
					});
					linkedPaths.documents = folder.path;
				})
				.createFolder("Desktop", (folder) => {
					folder.createFileLink("Info.md", (fileLink) => {
						(fileLink as VirtualFileLink).setLinkedPath(linkedPaths.info);
					}).createFileLink("Prozilla.md", (fileLink) => {
						(fileLink as VirtualFileLink).setLinkedPath(linkedPaths.links);
					}).createFolderLink("Pictures", (folderLink) => {
						(folderLink as VirtualFolderLink).setLinkedPath(linkedPaths.images);
					}).createFolderLink("Documents", (folderLink) => {
						(folderLink as VirtualFolderLink).setLinkedPath(linkedPaths.documents);
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
		"/public/config/tree.json",
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
				const { name, extension } = VirtualFile.splitId(filePath);
				virtualRoot.createFile(name, extension as string | undefined, callback);
				return;
			}

			const parentPath = filePath.substring(0, lastSlashIndex);
    		const { name, extension } = VirtualFile.splitId(filePath.substring(lastSlashIndex + 1));

			const parentFolder = virtualRoot.navigate(parentPath) as VirtualFolder;
			parentFolder.createFile(name, extension as string | undefined, callback);
		});
	}).catch(() => {
		console.warn("Failed to load repository tree. Make sure the tree data is valid and up-to-date using 'npm run fetch'.");
	});
}