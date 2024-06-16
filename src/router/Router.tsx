import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultRoute } from "./routes/DefaultRoute";
import { StandaloneRoute } from "./routes/StandaloneRoute";
import { NoRoute } from "./routes/NoRoute";
import { App, AppsManager } from "@prozilla-os/core";

export function Router() {
	return <BrowserRouter>
		<Routes>
			<Route path="/">
				<Route index element={<DefaultRoute/>}/>
				{AppsManager.APPS.map((app: App) => 
					<Route path={app.id} key={app.id} element={<StandaloneRoute app={app}/>}/>
				)}
				<Route path="*" element={<NoRoute/>}/>
			</Route>
		</Routes>
	</BrowserRouter>;
}