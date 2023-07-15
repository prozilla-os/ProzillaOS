import "./App.css";
import { TaskBar } from "./components/TaskBar.js";
import { Window } from "./components/Window.js";
import Application from "./modules/applications/application.js";
import Vector2 from "./modules/math/vector2.js";

function App() {
	return (
		<div className="App">
			<TaskBar/>
			<Window
				app={new Application("Terminal", "terminal")}
				size={new Vector2(500, 250)}
				position={new Vector2(100, 50)}
			/>
		</div>
	);
}

export default App;
