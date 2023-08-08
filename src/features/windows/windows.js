import ApplicationsManager from "../applications/applications.js";
import { randomRange } from "../math/random.js";
import Vector2 from "../math/vector2.js";
import { VirtualFile } from "../virtual-drive/virtual-file.js";

export const SCREEN_MARGIN = 32;
export const TASKBAR_HEIGHT = 48;

export default class WindowsManager {
	constructor() {
		this.windows = {};
		this.updateWindows = () => {};
	}

	/**
	 * @param {string} appId 
	 * @param {object | null} options 
	 * @returns {object | null}
	 */
	open(appId, options) {
		const app = ApplicationsManager.getApplication(appId);

		if (app == null) {
			console.warn(`Failed to open app ${appId}: app not found`);
			return;
		}

		const size = options?.size ?? app.windowOptions?.size ?? new Vector2(700, 400);
		const position = new Vector2(randomRange(SCREEN_MARGIN, window.innerWidth - size.x - SCREEN_MARGIN),
			randomRange(SCREEN_MARGIN, window.innerHeight - size.y - SCREEN_MARGIN - TASKBAR_HEIGHT));

		let id = 0;
		while (this.windowIds.includes(id.toString())) {
			id++;
		}

		id = id.toString();

		console.log(`Opening window ${id}:${app.id}`);

		this.windows[id] = {
			id,
			app,
			size,
			position,
			options,
			lastInteraction: new Date().valueOf()
		};

		this.updateWindows(this.windows);
		return this.windows[id];
		// console.log(this);
	}

	/**
	 * @param {VirtualFile} file 
	 * @returns {object}
	 */
	openFile(file) {
		const app = ApplicationsManager.getFileApplication(file.extension);
		if (app != null)
			return this.open(app.id, { file });
	}

	/**
	 * @param {string} windowId 
	 */
	close(windowId) {
		windowId = windowId.toString();

		if (!this.windowIds.includes(windowId)) {
			console.warn(`Failed to close window ${windowId}: window not found`);
			return;
		}
		
		console.log(`Closing window ${windowId}`);
		delete this.windows[windowId];

		this.updateWindows(this.windows);
		// console.log(this);
	}

	/**
	 * @param {string} windowId
	 */
	focus(windowId) {
		windowId = windowId.toString();

		if (!this.windowIds.includes(windowId)) {
			console.warn(`Failed to focus window ${windowId}: window not found`);
			return;
		}

		const window = this.windows[windowId];
		window.lastInteraction = new Date().valueOf();
		
		this.updateWindows(this.windows);
	}

	/**
	 * @param {string} appId 
	 * @returns {boolean}
	 */
	isAppActive(appId) {
		let active = false;

		Object.values(this.windows).forEach((window) => {
			if (window.app.id === appId) {
				active = true;
				return;
			}
		});

		return active;
	}

	/**
	 * @param {Function} updateWindows 
	 */
	setUpdateWindows(updateWindows) {
		this.updateWindows = updateWindows;
	}

	/**
	 * @returns {string[]}
	 */
	get windowIds() {
		return Object.keys(this.windows);
	}
}