import { Desktop, ModalsView, Taskbar, WindowsView } from "prozilla-os";

export function DefaultRoute() {
	return <>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</>;
}