import { Desktop } from "../../desktop/Desktop";
import { ModalsView } from "../../modals/ModalsView";
import { Taskbar } from "../../taskbar/Taskbar";
import { WindowsView } from "../../windows/WindowsView";

export function DefaultRoute() {
	return <>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</>;
}