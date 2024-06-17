import { useCallback, useEffect, useState } from "react";
import styles from "./StandaloneRoute.module.css";
import { NAME } from "../../config/branding.config";
import { App, generateUrl, getViewportParams, ModalsView, openUrl, setViewportIcon, setViewportTitle } from "prozilla-os";
import { StandaloneHeader } from "../../components/standalone/StandaloneHeader";

interface StandaloneRouteProps {
	app: App;
}

export function StandaloneRoute({ app }: StandaloneRouteProps) {
	const [title, setTitle] = useState(app.name);
	const [iconUrl, setIconUrl] = useState(app.iconUrl ?? "");

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