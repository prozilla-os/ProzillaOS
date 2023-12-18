import { TASKBAR_HEIGHT } from "../../constants/taskBar.js";
import { SCREEN_MARGIN } from "../../constants/windows.js";
import AppsManager from "../applications/applications.js";
import { randomRange } from "../math/random.js";
import Vector2 from "../math/vector2.js";
import { VirtualFile } from "../virtual-drive/virtualFile.js";

export default class WindowsManager {
	constructor() {
		this.windows = {};
		this.updateWindows = () => {};
		this.startupComplete = false;
	}

	/**
	 * @param {string} appId 
	 * @param {object | null} options 
	 * @returns {object | null}
	 */
	open(appId, options) {
		const app = AppsManager.getApp(appId);

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

		console.info(`Opening window ${id}:${app.id}`);

		this.windows[id] = {
			id,
			app,
			size,
			position,
			options,
		};

		this.focus(id);

		app.isActive = true;

		this.updateWindows(this.windows);
		return this.windows[id];
		// console.log(this);
	}

	/**
	 * @param {VirtualFile} file 
	 * @param {object} options 
	 * @returns {object}
	 */
	openFile(file, options = {}) {
		const app = AppsManager.getFileApp(file?.extension);
		if (app != null)
			return this.open(app.id, { file, ...options });
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

		const { app } = this.windows[windowId];
		app.isActive = this.isAppActive(app.id);
		
		console.info(`Closing window ${windowId}`);
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

		Object.values(this.windows).forEach((window) => {
			const isFocused = (window.id === windowId);
			window.isFocused = isFocused;

			if (isFocused) {
				window.lastInteraction = new Date().valueOf();
				window.minimized = false;
			}
		});

		this.updateWindows(this.windows);
	}

	/**
	 * @param {string} windowId
	 */
	isFocused(windowId) {
		return this.windows[windowId].isFocused;
	}

	/**
	 * @param {string} windowId
	 * @param {boolean=} minimized
	 */
	setMinimized(windowId, minimized) {
		windowId = windowId.toString();

		if (!this.windowIds.includes(windowId)) {
			console.warn(`Failed to set minimized on window ${windowId}: window not found`);
			return;
		}

		const window = this.windows[windowId];
		window.minimized = minimized ?? !window.minimized;

		this.updateWindows(this.windows);
	}

	minimizeAll() {
		Object.values(this.windows).forEach((window) => {
			window.minimized = true;
		});

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
	 * @param {string} appId
	 * @returns {string}
	 */
	getAppWindowId(appId) {
		let windowId = null;

		Object.values(this.windows).forEach((window) => {
			if (window.app.id === appId) {
				windowId = window.id;
				return;
			}
		});

		return windowId;
	}

	/**
	 * @param {Function} updateWindows 
	 */
	setUpdateWindows(updateWindows) {
		this.updateWindows = updateWindows;
	}

	startup(appIds) {
		if (appIds == null || this.startupComplete)
			return;

		appIds.forEach((appId) => {
			this.open(appId);
		});

		this.startupComplete = true;
	}

	/**
	 * @returns {string[]}
	 */
	get windowIds() {
		return Object.keys(this.windows);
	}
}