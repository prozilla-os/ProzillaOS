import { useWindows } from "../../hooks/windows/windowsContext.js";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import { memo, useEffect, useState } from "react";
import { WindowView } from "./WindowView.jsx";
import { useSettingsManager } from "../../hooks/settings/settingsManagerContext.js";
import { SettingsManager } from "../../features/settings/settingsManager.js";

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

	// Launch startup apps
	useEffect(() => {
		const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.applications);
		settings.get("startup", (value) => {
			if (value !== "")
				windowsManager.startup(value?.split(","));
		});
	}, [settingsManager, windowsManager]);

	// TO DO: prevent windows from being rerendered when order is changed

	return (<div>
		{sortedWindows.map(({ id, app, size, position, options, minimized }, index) => 
			<WindowView
				key={id}
				onInteract={() => { windowsManager.focus(id); }}
				active={index === 0}
				id={id}
				app={app}
				size={size}
				position={position}
				options={options}
				minimized={minimized}
				toggleMinimized={(event) => {
					event.preventDefault();
					event.stopPropagation();
					windowsManager.setMinimized(id, !minimized);
				}}
			/>
		)}
	</div>);
});