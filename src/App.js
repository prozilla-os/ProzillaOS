import "./App.css";
import { Taskbar } from "./components/TaskBar.js";
import { WindowsManagerProvider } from "./hooks/WindowsManagerContext.js";
import { WindowsView } from "./components/WindowsView.js";
import { VirtualRootProvider } from "./hooks/VirtualRootContext.js";

function App() {
	return (
		<VirtualRootProvider>
			<WindowsManagerProvider>
				<div className="App">
					<Taskbar/>
					<WindowsView/>
				</div>
			</WindowsManagerProvider>
		</VirtualRootProvider>
	);
}

export default App;
