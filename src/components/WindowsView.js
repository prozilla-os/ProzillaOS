import { Window } from "./Window.js";
import { useWindows } from "../hooks/WindowsContext.js";

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