import "./App.css";
import { TaskBar } from "./components/TaskBar.js";
import { WindowsManagerProvider } from "./hooks/WindowsManagerContext.js";
import { WindowsView } from "./components/WindowsView.js";

function App() {
	return (
		<WindowsManagerProvider>
			<div className="App">
				<TaskBar/>
				<WindowsView/>
			</div>
		</WindowsManagerProvider>
	);
}

export default App;
