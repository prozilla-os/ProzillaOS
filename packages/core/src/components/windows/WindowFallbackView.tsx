import { useEffect, useState } from "react";
import { useAlert } from "../../hooks/modals/alert";
import { Vector2 } from "../../features/math/vector2";
import { useSystemManager } from "../../hooks";
import { App } from "../../features";
import { FallbackProps } from "react-error-boundary";

export interface WindowFallbackViewProps extends FallbackProps {
	error: unknown;
	app?: App;
	closeWindow?: () => void;
}

export function WindowFallbackView({ error, app, closeWindow }: WindowFallbackViewProps): undefined {
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
				text: error instanceof Error ? `${error.name}: ${error.message}` : "Unknown error",
				iconUrl: appsConfig.getAppById(app.id)?.iconUrl as string | undefined,
				size: new Vector2(350, 150),
				single: true,
			});
	}, [alerted, alert, app?.id, app?.name, error, closeWindow]);

	return;
}