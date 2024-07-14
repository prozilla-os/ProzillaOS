import { useEffect, useState } from "react";
import { useAlert } from "../../hooks/modals/alert";
import { Vector2 } from "../../features/math/vector2";
import { useSystemManager } from "../../hooks";
import { App } from "../../features";

export interface WindowFallbackViewProps {
	error?: Error;
	resetErrorBoundary?: unknown;
	app?: App;
	closeWindow?: Function
}

// I don't know why this component's type needs to be ReactNode instead of FC, it has something to do with the way it's implemented
export function WindowFallbackView({ error, resetErrorBoundary: _resetErrorBoundary, app, closeWindow }: WindowFallbackViewProps): undefined {
	const { appsConfig } = useSystemManager();
	const { alert } = useAlert();
	const [alerted, setAlerted] = useState(false);

	useEffect(() => {
		if (alerted)
			return;

		setAlerted(true);
		closeWindow?.();

		if (app != null && error != null)
			alert({
				title: `${app.name} has stopped working`,
				text: `${error.name}: ${error.message}`,
				iconUrl: appsConfig.getAppById(app.id)?.iconUrl as string | undefined,
				size: new Vector2(350, 150),
				single: true
			});
	}, [alerted, alert, app?.id, app?.name, error?.message, closeWindow, error?.name]);

	return;
}