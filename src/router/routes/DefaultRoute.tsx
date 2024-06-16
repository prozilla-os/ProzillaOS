import { Desktop, ModalsView, Taskbar, WindowsView } from "@prozilla-os/core";

export function DefaultRoute() {
	return <>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</>;
}