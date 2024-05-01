import { useWindows } from "../../hooks/windows/windowsContext.js";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import { memo, useEffect, useState } from "react";
import { WindowView } from "./WindowView.jsx";
import { useSettingsManager } from "../../hooks/settings/settingsManagerContext.js";
import { SettingsManager } from "../../features/settings/settingsManager.js";
import { NAME, TAG_LINE } from "../../config/branding.config.js";
import { getViewportParams, setViewportIcon, setViewportTitle } from "../../features/_utils/browser.utils.js";
import { removeDuplicatesFromArray } from "../../features/_utils/array.utils.js";

export const WindowsView = memo(() => {
	const settingsManager = useSettingsManager();
	const windows = useWindows();
	const windowsManager = useWindowsManager();
	const [sortedWindows, setSortedWindows] = useState([]);

	// Sort windows
	useEffect(() => {
		setSortedWindows([...windows].sort((windowA, windowB) =>
			windowA.lastInteraction - windowB.lastInteraction
		));
	}, [windows]);

	useEffect(() => {
		const resetViewportTitleAndIcon = () => {
			setViewportTitle(`${NAME} | ${TAG_LINE}`);
			setViewportIcon(`${process.env.PUBLIC_URL}/favicon.ico`);
		};

		if (sortedWindows.length === 0 || sortedWindows[sortedWindows.length - 1].minimized)
			resetViewportTitleAndIcon();

		window.addEventListener("blur", resetViewportTitleAndIcon);

		return () => {
			window.removeEventListener("blur", resetViewportTitleAndIcon);
		};
	}, [sortedWindows]);

	// Launch startup apps
	useEffect(() => {
		if (windowsManager.startupComplete)
			return;

		let startupAppNames = [];

		// Get app name and params from URL query
		const params = getViewportParams();
		const appName = params.app;
		if (appName)
			startupAppNames.push(appName);
		delete params.app;

		// Get list of app names from settings file
		const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.apps);
		settings.get("startup", (value) => {
			if (value !== "") {
				startupAppNames = value?.split(",").concat(startupAppNames);
				startupAppNames = removeDuplicatesFromArray(startupAppNames);
			}

			windowsManager.startup(startupAppNames, params);
		});
	}, [settingsManager, windowsManager]);

	return (<div>
		{windows.map((window) => {
			const { id, app, size, position, options, minimized, fullscreen } = window;
			const index = sortedWindows.indexOf(window);
			return <WindowView
				key={id}
				onInteract={() => { windowsManager.focus(id); }}
				active={index === sortedWindows.length - 1}
				id={id}
				app={app}
				size={size}
				index={index}
				position={position}
				options={options}
				minimized={minimized}
				toggleMinimized={(event) => {
					event.preventDefault();
					event.stopPropagation();
					windowsManager.setMinimized(id, !minimized);
				}}
				fullscreen={fullscreen}
			/>;
		})}
	</div>);
});