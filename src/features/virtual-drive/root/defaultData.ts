import { APPS } from "../../../config/apps.config";
import { WALLPAPERS } from "../../../config/desktop.config";
import AppsManager from "../../apps/appsManager";
import { VirtualFileLink } from "../file/virtualFileLink";
import { VirtualFolderLink } from "../folder";
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
					folder.createFileLink("info.md", (fileLink: VirtualFileLink) => {
						fileLink.setLinkedPath(linkedPaths.info);
					}).createFileLink("links.md", (fileLink: VirtualFileLink) => {
						fileLink.setLinkedPath(linkedPaths.links);
					}).createFolderLink("Pictures", (folderLink: VirtualFolderLink) => {
						folderLink.setLinkedPath(linkedPaths.images);
					}).createFolderLink("Documents", (folderLink: VirtualFolderLink) => {
						folderLink.setLinkedPath(linkedPaths.documents);
					});
				});
		});
	});

	virtualRoot.createFolder(".github", (folder) => {
		folder.createFile("FUNDING", "yml", (file) => {
			file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/.github/FUNDING.yml");
		});
	});

	virtualRoot.createFolder(".vscode", (folder) => {
		folder.createFile("settings", "json", (file) => {
			file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/.vscode/settings.json");
		});
	});

	virtualRoot.createFolder("docs", (folder) => {
		folder.createFile("README", "md", (file) => {
			file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/docs/README.md");
		});
	});

	virtualRoot.createFolder("public", (folder) => {
		folder.createFolder("assets", (folder) => {
			folder.createFolder("apps", (folder) => {
				folder.createFolder("icons", (folder) => {
					AppsManager.APPS.forEach(({ id }) => {
						folder.createFile(id, "svg", (file) => {
							file.setSource(AppsManager.getAppIconUrl(id));
						});
					});
				});
			}).createFolder("fonts", (folder) => {
				folder.createFolders(["poppins", "roboto-mono"]);
			}).createFolder("screenshots", (folder) => {
				folder.createFile("screenshot", "png", (file) => {
					file.setSource(`${process.env.PUBLIC_URL}/assets/screenshots/screenshot-files-settings-taskbar-desktop.png`);
				});
			}).createFolder("wallpapers", (folder) => {
				folder.setProtected(true);
				for (let i = 0; i < WALLPAPERS.length; i++) {
					const source = WALLPAPERS[i];
					const name = source.split("/").pop().split(".")[0];
					folder.createFile(name, "png", (file) => {
						file.setSource(source);
					});
				}
			}).createFile("banner", "png", (file) => {
				file.setSource(`${process.env.PUBLIC_URL}/assets/banner-logo-title.png`);
			}).createFile("logo", "svg", (file) => {
				file.setSource(`${process.env.PUBLIC_URL}/assets/logo.svg`);
			});
		}).createFolder("config", (folder) => {
			folder.createFile("apps", "xml", (file) => {
				file.setSource(`${process.env.PUBLIC_URL}/config/apps.xml`);
			}).createFile("desktop", "xml", (file) => {
				file.setSource(`${process.env.PUBLIC_URL}/config/desktop.xml`);
			}).createFile("taskbar", "xml", (file) => {
				file.setSource(`${process.env.PUBLIC_URL}/config/taskbar.xml`);
			});
		}).createFolder("documents", (folder) => {
			folder.createFile("info", "md", (file) => {
				file.setSource(`${process.env.PUBLIC_URL}/documents/info.md`);
			}).createFile("links", "md", (file) => {
				file.setSource(`${process.env.PUBLIC_URL}/documents/links.md`);
			});
		}).createFile("favicon", "ico", (file) => {
			file.setSource(`${process.env.PUBLIC_URL}/favicon.ico`);
		}).createFile("index", "html", (file) => {
			file.setSource(`${process.env.PUBLIC_URL}/index.html`);
		}).createFile("robots", "txt", (file) => {
			file.setSource(`${process.env.PUBLIC_URL}/robots.txt`);
		}).createFile("sitemap", "xml", (file) => {
			file.setSource(`${process.env.PUBLIC_URL}/sitemap.xml`);
		});
	});

	virtualRoot.createFolder("src", (folder) => {
		folder.createFolder("components")
			.createFolder("config")
			.createFolder("features")
			.createFolder("hooks")
			.createFolder("styles")
			.createFile("App", "jsx", (file) => {
				file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/src/App.jsx");
			}).createFile("index", "js", (file) => {
				file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/src/index");
			});
	});

	virtualRoot.createFile("", "env", (file) => {
		file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/.env");
	}).createFile("", "gitignore", (file) => {
		file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/.gitignore");
	}).createFile("LICENSE", "md", (file) => {
		file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/LICENSE.md");
	}).createFile("README", "md", (file) => {
		file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/README.md");
	}).createFile("package", "json", (file) => {
		file.setSource("https://raw.githubusercontent.com/Prozilla/Prozilla-OS/main/package.json");
	});
}