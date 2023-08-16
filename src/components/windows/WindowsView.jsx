import { useWindows } from "../../hooks/windows/windowsContext.js";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import { memo, useEffect, useState } from "react";
import { WindowView } from "./WindowView.jsx";

export const WindowsView = memo(() => {
	const windows = useWindows();
	const windowsManager = useWindowsManager();
	const [sortedWindows, setSortedWindows] = useState([]);

	useEffect(() => {
		setSortedWindows([...windows].sort((windowA, windowB) =>
			windowA.lastInteraction - windowB.lastInteraction
		));
	}, [windows]);

	// TO DO: prevent windows from being rerendered when order is changed

	return (<div>
		{sortedWindows.map(({ id, app, size, position, options }, index) => 
			<WindowView
				onInteract={() => { windowsManager.focus(id); }}
				active={index === 0}
				id={id}
				key={id}
				app={app}
				size={size}
				position={position}
				options={options}
			/>
		)}
	</div>);
});