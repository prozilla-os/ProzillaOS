import { useEffect, useState } from "react";
import App from "../../../features/apps/app";
import AppsManager from "../../../features/apps/appsManager";
import { setViewportIcon, setViewportTitle } from "../../../features/_utils/browser.utils";
import { NAME } from "../../../config/branding.config";

interface AppRouteProps {
	app: App;
}

export function AppRoute({ app }: AppRouteProps) {
	const [title, setTitle] = useState(app.name);
	const [iconUrl, setIconUrl] = useState(AppsManager.getAppIconUrl(app.id));

	useEffect(() => {
		const setViewportTitleAndIcon = () => {
			setViewportTitle(`${title} | ${NAME}`);
			setViewportIcon(iconUrl);
		};

		setViewportTitleAndIcon();
	}, [iconUrl, title]);

	return <app.WindowContent
		app={app}
		setTitle={setTitle}
		setIconUrl={setIconUrl}
		active={true}
	/>;
}