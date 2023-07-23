import { Window } from "./Window.jsx";
import { useWindows } from "../../hooks/windows/WindowsContext.js";

export function WindowsView() {
	const windows = useWindows();

	return (<div>
		{windows.map(({ id, app, size, position}) => 
			<Window
				id={id}
				key={id}
				app={app}
				size={size}
				position={position}
			/>
		)}
	</div>);
}