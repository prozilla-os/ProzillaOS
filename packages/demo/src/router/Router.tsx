import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultRoute } from "./routes/DefaultRoute";
import { StandaloneRoute } from "./routes/StandaloneRoute";
import { NoRoute } from "./routes/NoRoute";
import { useSystemManager } from "prozilla-os";

export function Router() {
	const { appsConfig } = useSystemManager();

	return <BrowserRouter>
		<Routes>
			<Route path="/">
				<Route index element={<DefaultRoute/>}/>
				{appsConfig.apps.map((app) => 
					<Route path={app.id} key={app.id} element={<StandaloneRoute app={app}/>}/>
				)}
				<Route path="*" element={<NoRoute/>}/>
			</Route>
		</Routes>
	</BrowserRouter>;
}