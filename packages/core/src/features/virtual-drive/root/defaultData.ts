import { Theme } from "@prozilla-os/skins";
import { FILE_SCHEMES } from "../../../constants/virtualDrive.const";
import { SystemManager } from "../../system/systemManager";
import { VirtualFile, VirtualFileLink } from "../file";
import { VirtualFolder, VirtualFolderLink } from "../folder";
import { VirtualRoot } from "./virtualRoot";

/**
 * Loads default data on the virtual root
 */
export function loadDefaultData(
	systemManager: SystemManager,
	virtualRoot: VirtualRoot
) {
	const { skin, appsConfig, virtualDriveConfig } = systemManager;
	const linkedPaths: Record<string, string> = {};

	virtualRoot.createFolder("home", (homeFolder) => {
		homeFolder.createFolder("prozilla-os", (userFolder) => {
			userFolder.setAlias("~").createFolder(".config", (configFolder) => {
				configFolder
					.createFile("desktop", "xml", (file) => {
						file.setContent([
							"<options>",
							`	<wallpaper>${skin.defaultWallpaper}</wallpaper>`,
							"	<show-icons>true</show-icons>",
							"</options>",
						]);
					})
					.createFile("taskbar", "xml", (file) => {
						file.setContent([
							"<options>",
							`	<pins>${appsConfig.apps
								.filter((app) => app.pinnedByDefault)
								.map(({ id }) => id)
								.join(",")}</pins>`,
							"</options>",
						]);
					})
					.createFile("apps", "xml", (file) => {
						file.setContent([
							"<options>",
							`	<startup>${appsConfig.apps
								.filter((app) => app.launchAtStartup)
								.map(({ id }) => id)
								.join(",")}</startup>`,
							"</options>",
						]);
					})
					.createFile("theme", "xml", (file) => {
						file.setContent([
							"<options>",
							`	<theme>${skin.defaultTheme ?? Theme.Dark}</theme>`,
							"</options>",
						]);
					});
			});

			userFolder.createFolder("Pictures", (picturesFolder) => {
				linkedPaths.pictures = picturesFolder.path;
			});

			userFolder.createFolder("Documents", (documentsFolder) => {
				documentsFolder.setIconUrl(
					skin.folderIcons.text ?? skin.folderIcons.generic
				);
				linkedPaths.documents = documentsFolder.path;
			});

			if (virtualDriveConfig.defaultData.includeDesktopFolder) {
				userFolder.createFolder("Desktop", (desktopFolder) => {
					appsConfig.apps.forEach((app) => {
						if (!app.showDesktopIcon) return;

						desktopFolder.createFile(app.name, undefined, (file) => {
							file.setSource(FILE_SCHEMES.app + app.id).setIconUrl(app.iconUrl);
						});
					});
				});
			}

			if (virtualDriveConfig.defaultData.includeVideoFolder) {
				userFolder.createFolder("Video");
			}

			if (virtualDriveConfig.defaultData.includeAudioFolder) {
				userFolder.createFolder("Audio");
			}

			if (virtualDriveConfig.defaultData.includeAppsFolder) {
				userFolder.createFolder("Apps", (appsFolder) => {
					appsConfig.apps.forEach((app) => {
						appsFolder.createFile(app.name, undefined, (file) => {
							file.setSource(FILE_SCHEMES.app + app.id).setIconUrl(app.iconUrl);
						});
					});
				});
			}
		});
	});

	if (virtualDriveConfig.defaultData.includeSourceTree)
		loadSourceTree(virtualRoot);

	try {
		virtualDriveConfig.defaultData.loadData?.(virtualRoot);
	} catch (error) {
		console.error(error);
	}
}

// Create files and folders based on repository tree
function loadSourceTree(virtualRoot: VirtualRoot) {
	const excludedFiles = ["/public/config/tree.json"];

	void fetch("/config/tree.json")
		.then((response) => response.json())
		.then(({ files, folders }: { files: string[]; folders: string[] }) => {
			// Add folders
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

			// Add files
			files.forEach((filePath) => {
				if (excludedFiles.includes(filePath)) return;

				const lastSlashIndex = filePath.lastIndexOf("/");

				const callback = (virtualFile: VirtualFile) => {
					const virtualPath = virtualFile.absolutePath;
					if (virtualPath.startsWith("/public/")) {
						virtualFile.setSource(virtualPath.replace(/^\/public\//, "/"));
					} else {
						virtualFile.setSource(
							`https://raw.githubusercontent.com/Prozilla/ProzillaOS/main${virtualPath}`
						);
					}
				};

				if (lastSlashIndex === -1) {
					const { name, extension } = VirtualFile.splitId(filePath);
					virtualRoot.createFile(
						name,
            extension as string | undefined,
            callback
					);
					return;
				}

				const parentPath = filePath.substring(0, lastSlashIndex);
				const { name, extension } = VirtualFile.splitId(
					filePath.substring(lastSlashIndex + 1)
				);

				const parentFolder = virtualRoot.navigate(parentPath) as VirtualFolder;
				parentFolder.createFile(
					name,
          extension as string | undefined,
          callback
				);
			});
		})
		.catch(() => {
			console.warn(
				"Failed to load source tree. Make sure the tree data is valid and up-to-date using the fetchRepository script."
			);
		});
}

