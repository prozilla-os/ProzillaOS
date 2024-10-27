import { VirtualDriveConfig, VirtualFolder, VirtualRoot } from "prozilla-os";
import { PROJECTS } from "../constants/projects";
import { BLOG } from "../constants/blog";

function loadData(virtualRoot: VirtualRoot) {
	const userFolder = virtualRoot.navigate("~");

	if (!userFolder || !(userFolder instanceof VirtualFolder))
		return;

	userFolder.createFolder("Desktop", (desktopFolder) => {
		desktopFolder.createFolder("Projects", (projectsFolder) => {
			PROJECTS.forEach((project) => {
				projectsFolder.createFolder(project.title, (projectFolder) => {
					projectFolder.createFile("About", "md", (file) => {
						file.setSource(project.document);
					}).createFile(project.url, undefined, (file) => {
						file.setSource(project.url);
					});
				});
			});
		});

		desktopFolder.createFolder("Blog", (blogFolder) => {
			BLOG.forEach((post) => {
				blogFolder.createFile(post.title, "md", (file) => {
					file.setSource(post.document);
				});
			});
		});

		desktopFolder.createFolder("Links");

		desktopFolder.createFile("AboutMe", "md", (file) => {
			file.setSource("documents/about-me.md");
		});
	});
}

export const virtualDriveConfig = new VirtualDriveConfig({
	saveData: false,
	defaultData: {
		includeDesktopFolder: false,
		includeDocumentsFolder: false,
		includePicturesFolder: false,
		includeSourceTree: false,
		includeAppsFolder: false,
		loadData,
	},
});
