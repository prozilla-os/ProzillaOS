import { useCallback, useEffect, useState } from "react";
import { App } from "../../../features/apps/app";
import { AppsManager } from "../../../features/apps/appsManager";
import { generateUrl, getViewportParams, openUrl, setViewportIcon, setViewportTitle } from "../../../features/_utils/browser.utils";
import { NAME } from "../../../config/branding.config";
import { StandaloneHeader } from "../../windows/StandaloneHeader";
import styles from "./StandaloneRoute.module.css";
import { ModalsView } from "../../modals/ModalsView";

interface StandaloneRouteProps {
	app: App;
}

export function StandaloneRoute({ app }: StandaloneRouteProps) {
	const [title, setTitle] = useState(app.name);
	const [iconUrl, setIconUrl] = useState(AppsManager.getAppIconUrl(app.id));

	useEffect(() => {
		// TO DO: don't overwrite metadata in production

		const setViewportTitleAndIcon = () => {
			if (import.meta.env.DEV)
				setViewportTitle(`${title} | ${NAME}`);
			setViewportIcon(iconUrl);
		};

		setViewportTitleAndIcon();
	}, [iconUrl, title]);

	const params = getViewportParams();

	const exit = useCallback(() => {
		const url = generateUrl({ appId: app.id });
		openUrl(url, "_self");
	}, [app.id]);

	return <div className={styles.StandaloneView}>
		<ModalsView/>
		<StandaloneHeader exit={exit}/>
		<div className={styles.StandaloneWindow}>
			<app.WindowContent
				app={app}
				setTitle={setTitle}
				setIconUrl={setIconUrl}
				active={true}
				standalone={true}
				close={() => { exit(); }}
				{...params}
			/>
		</div>
	</div>;
}