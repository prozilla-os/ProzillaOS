import { useEffect, useState } from "react";
import "./App.css";
import { TaskBar } from "./components/TaskBar.js";
import WindowsManager from "./modules/windows/windows.js";

export const windowsManager = new WindowsManager();

function App() {
	const [windows, setWindows] = useState([]);

	useEffect(() => {
		setWindows(Object.values(windowsManager.windows));
	}, []);

	return (
		<div className="App">
			<TaskBar/>
			{windows}
		</div>
	);
}

export default App;
