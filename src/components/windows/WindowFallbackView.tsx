import { ReactNode, useEffect, useState } from "react";
import { useAlert } from "../../hooks/modals/alert";
import AppsManager from "../../features/apps/appsManager";
import Vector2 from "../../features/math/vector2";
import App from "../../features/apps/app";

export interface WindowFallbackViewProps {
	error?: Error;
	resetErrorBoundary?: any;
	app?: App;
	closeWindow?: Function
}

// I don't know why this component's type needs to be ReactNode instead of FC, it has something to do with the way it's implemented
export default function WindowFallbackView({ error, resetErrorBoundary, app, closeWindow }: WindowFallbackViewProps): ReactNode {
	const { alert } = useAlert();
	const [alerted, setAlerted] = useState(false);

	useEffect(() => {
		if (alerted)
			return;

		setAlerted(true);
		closeWindow();
		alert({
			title: `${app.name} has stopped working`,
			text: `${error.name}: ${error.message}`,
			iconUrl: AppsManager.getAppIconUrl(app.id),
			size: new Vector2(350, 150),
			single: true
		});
	}, [alerted, alert, app.id, app.name, error.message, closeWindow, error.name]);

	return;
}