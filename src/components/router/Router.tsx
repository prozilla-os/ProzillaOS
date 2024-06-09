import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultRoute } from "./routes/DefaultRoute";
import AppsManager from "../../features/apps/appsManager";
import App from "../../features/apps/app";
import { AppRoute } from "./routes/AppRoute";
import { NoRoute } from "./routes/NoRoute";

export function Router() {
	return <BrowserRouter>
		<Routes>
			<Route path="/">
				<Route index element={<DefaultRoute/>}/>
				{AppsManager.APPS.map((app: App) => 
					<Route path={app.id} key={app.id} element={<AppRoute app={app}/>}/>
				)}
				<Route path="*" element={<NoRoute/>}/>
			</Route>
		</Routes>
	</BrowserRouter>;
}