import { Window } from "./Window.jsx";
import { useWindows } from "../../hooks/windows/WindowsContext.js";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";

export function WindowsView() {
	const windows = useWindows();
	const windowsManager = useWindowsManager();

	return (<div>
		{windows.sort((windowA, windowB) =>
			windowA.lastInteraction - windowB.lastInteraction
		).map(({ id, app, size, position }, index) => 
			<Window
				onInteract={() => { windowsManager.focus(windows[index]); }}
				id={id}
				key={id}
				app={app}
				size={size}
				position={position}
			/>
		)}
	</div>);
}