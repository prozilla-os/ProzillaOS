import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultRoute } from "./routes/DefaultRoute";
import { StandaloneRoute } from "./routes/StandaloneRoute";
import { NoRoute } from "./routes/NoRoute";
import { useSystemManager } from "../hooks/system/systemManagerContext";

interface RouterProps {
	path?: string;
	homePage?: JSX.Element;
	fallbackPage?: JSX.Element;
}

export function Router({ path = "/", homePage = <DefaultRoute/>, fallbackPage = <NoRoute/> }: RouterProps) {
	const { appsConfig } = useSystemManager();

	return <BrowserRouter>
		<Routes>
			<Route path={path}>
				<Route index element={homePage}/>
				{appsConfig.apps.map((app) => 
					<Route path={app.id} key={app.id} element={<StandaloneRoute app={app}/>}/>
				)}
				<Route path="*" element={fallbackPage}/>
			</Route>
		</Routes>
	</BrowserRouter>;
}