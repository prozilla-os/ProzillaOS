import { TASKBAR_HEIGHT } from "../../config/taskbar.config";
import { SCREEN_MARGIN } from "../../config/windows.config";
import App from "../apps/app";
import AppsManager from "../apps/appsManager";
import { randomRange } from "../math/random";
import Vector2 from "../math/vector2";
import { TrackingManager } from "../tracking/trackingManager";
import { VirtualFile } from "../virtual-drive/file";

export interface WindowOptions {
	id?: string;
	app?: App;
	size?: Vector2;
	position?: Vector2;
	fullscreen?: boolean | string;
	options?: object;
	isFocused?: boolean;
	lastInteraction?: number;
	minimized?: boolean;
	[key: string]: unknown;
}

export default class WindowsManager {
	windows: { [id: string]: WindowOptions };
	updateWindows: Function;
	startupComplete: boolean;

	constructor() {
		this.windows = {};
		this.updateWindows = () => {};
		this.startupComplete = false;
	}

	open(appId: string, options?: WindowOptions | null): object | null {
		const app = AppsManager.getAppById(appId);

		if (app == null) {
			console.warn(`Failed to open app ${appId}: app not found`);
			return;
		}

		const size = options?.size ?? app.windowOptions?.size ?? new Vector2(700, 400);

		const availableScreenSpace = new Vector2(
			window.innerWidth - SCREEN_MARGIN * 2,
			window.innerHeight - SCREEN_MARGIN * 2 - TASKBAR_HEIGHT
		);

		let fullscreen = false;

		if (size.x > availableScreenSpace.x) {
			size.x = availableScreenSpace.x;
			fullscreen = true;
		} else if (size.y > availableScreenSpace.y) {
			size.y = availableScreenSpace.y;
			fullscreen = true;
		}

		const position = new Vector2(
			SCREEN_MARGIN + randomRange(0, availableScreenSpace.x - size.x),
			SCREEN_MARGIN + randomRange(0, availableScreenSpace.y - size.y)
		);

		if (options?.fullscreen) {
			if (typeof(options.fullscreen) == "string") {
				fullscreen = options.fullscreen.toLowerCase() === "true";
			} else {
				fullscreen = options.fullscreen;
			}

			delete options.fullscreen;
		}

		let id: number | string = 0;
		while (this.windowIds.includes(id.toString())) {
			id++;
		}

		id = id.toString();

		TrackingManager.event({
			category: "Actions",
			action: "Opened window",
			label: app.id
		});

		console.info(`Opening window ${id}:${app.id}`);

		this.windows[id] = {
			id,
			app,
			size,
			position,
			fullscreen,
			options,
		};

		this.focus(id);

		app.isActive = true;

		this.updateWindows(this.windows);
		return this.windows[id];
		// console.log(this);
	}

	openFile(file: VirtualFile, options: object = {}): object {
		const app = AppsManager.getAppByFileExtension(file?.extension);
		if (app != null)
			return this.open(app.id, { file, ...options });
	}

	close(windowId: string) {
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

	focus(windowId: string) {
		windowId = windowId.toString();

		if (!this.windowIds.includes(windowId)) {
			console.warn(`Failed to focus window ${windowId}: window not found`);
			return;
		}

		Object.values(this.windows).forEach((window) => {
			const isFocused = (window.id === windowId);
			window.isFocused = isFocused;

			if (isFocused) {
				window.lastInteraction = Date.now().valueOf();
				window.minimized = false;
			}
		});

		this.updateWindows(this.windows);
	}

	isFocused(windowId: string) {
		return this.windows[windowId].isFocused;
	}

	isAnyFocused() {
		let anyFocused = false;

		Object.values(this.windows).forEach((window) => {
			if (window.isFocused)
				return anyFocused = true;
		});

		return anyFocused;
	}

	/**
	 * @param minimized - Leave as undefined to toggle the window's minimization state
	 */
	setMinimized(windowId: string, minimized?: boolean) {
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

	isAppActive(appId: string): boolean {
		let active = false;

		Object.values(this.windows).forEach((window) => {
			if (window.app.id === appId) {
				active = true;
				return;
			}
		});

		return active;
	}

	getAppWindowId(appId: string): string | null {
		let windowId: string | null = null;

		Object.values(this.windows).forEach((window) => {
			if (window.app.id === appId) {
				windowId = window.id;
				return;
			}
		});

		return windowId;
	}

	setUpdateWindows(updateWindows: Function) {
		this.updateWindows = updateWindows;
	}

	startup(appIds: string[], options: {}) {
		if (appIds == null || this.startupComplete)
			return;

		appIds.forEach((appId) => {
			this.open(appId, options);
		});

		this.startupComplete = true;
	}

	get windowIds(): string[] {
		return Object.keys(this.windows);
	}
}