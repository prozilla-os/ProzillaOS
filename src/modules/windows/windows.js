import ApplicationsManager from "../applications/applications.js";
import Vector2 from "../math/vector2.js";

export default class WindowsManager {
	constructor() {
		this.windows = {};
		this.updateWindows = () => {};
		console.log("Windows manager init");
	}

	open(appId) {
		const app = ApplicationsManager.getApplication(appId);
		const size = new Vector2(800, 400);
		const position = new Vector2(300, 200);

		let id = 0;
		while (this.windowIds.includes(id.toString())) {
			id++;
		}

		console.log(`Opening window ${id}:${app.id}`);

		this.windows[id.toString()] = {
			id,
			app,
			size,
			position
		};

		this.updateWindows(this.windows);

		// console.log(this);
	}

	close(windowId) {
		windowId = windowId.toString();

		if (!this.windowIds.includes(windowId)) {
			console.log(`Failed to close window ${windowId}: window not found`);
			return;
		}
		
		console.log(`Closing window ${windowId}`);
		delete this.windows[windowId];

		this.updateWindows(this.windows);
		// console.log(this);
	}

	isAppActive(appId) {
		let active = false;

		Object.values(this.windows).forEach((window) => {
			console.log(window.app.id, appId);
			if (window.app.id === appId) {
				active = true;
				return;
			}
		});

		return active;
	}

	setUpdateWindows(updateWindows) {
		this.updateWindows = updateWindows;
	}

	get windowIds() {
		return Object.keys(this.windows);
	}
}