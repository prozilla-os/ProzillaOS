import { useWindows } from "../../hooks/windows/WindowsContext.js";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";
import { useEffect, useState } from "react";
import { WindowView } from "./WindowView.jsx";

export function WindowsView() {
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
		{sortedWindows.map(({ id, app, size, position, options }) => 
			<WindowView
				onInteract={() => { windowsManager.focus(id); }}
				id={id}
				key={id}
				app={app}
				size={size}
				position={position}
				options={options}
			/>
		)}
	</div>);
}