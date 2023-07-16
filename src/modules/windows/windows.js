import { Window } from "../../components/Window.js";
import ApplicationsManager from "../applications/applications.js";
import Vector2 from "../math/vector2.js";

export default class WindowsManager {
	windows = {};

	open(appId) {
		const appData = ApplicationsManager.getApplication(appId);
		const size = new Vector2(800, 400);
		const position = new Vector2(300, 200);

		let id = 0;
		while (Object.keys(this.windows).includes(id)) {
			id++;
		}

		console.log(`Opening window ${id}:${appData.id}`);

		this.windows[id] = <Window
			id={id}
			key={id}
			app={appData}
			size={size}
			position={position}
		/>;
	}

	close(windowId) {
		if (!Object.keys(this.windows).includes(windowId))
			return;

		console.log(`Closing window ${windowId}`);
		delete this.windows[windowId];
	}

	get windowsCount() {
		return Object.keys(this.windows).length;
	}
}