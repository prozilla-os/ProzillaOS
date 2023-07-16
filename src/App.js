import "./App.css";
import { Taskbar } from "./components/Taskbar.js";
import { WindowsManagerProvider } from "./hooks/WindowsManagerContext.js";
import { WindowsView } from "./components/WindowsView.js";

function App() {
	return (
		<WindowsManagerProvider>
			<div className="App">
				<Taskbar/>
				<WindowsView/>
			</div>
		</WindowsManagerProvider>
	);
}

export default App;
