import { Window } from "./Window.jsx";
import { useWindows } from "../../hooks/windows/WindowsContext.js";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";

export function WindowsView() {
	const windows = useWindows();
	const windowsManager = useWindowsManager();

	// TO DO: prevent windows from being rerendered when order is changed

	return (<div>
		{windows.sort((windowA, windowB) =>
			windowA.lastInteraction - windowB.lastInteraction
		).map(({ id, app, size, position, options }, index) => 
			<Window
				onInteract={() => { windowsManager.focus(windows[index]); }}
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