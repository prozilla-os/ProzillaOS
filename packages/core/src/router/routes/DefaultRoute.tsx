import { WindowsView } from "../../components/windows/WindowsView";
import { ModalsView } from "../../components/modals/ModalsView";
import { Taskbar } from "../../components/taskbar/Taskbar";
import { Desktop } from "../../components/desktop/Desktop";

export function DefaultRoute() {
	return <>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</>;
}