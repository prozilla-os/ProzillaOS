import { useEffect, useState } from "react";
import { useModalsManager } from "../../hooks/modals/modalsManagerContext";
import { useAlert } from "../../hooks/modals/alert.js";
import AppsManager from "../../features/apps/appsManager.js";
import Vector2 from "../../features/math/vector2.js";

export default function WindowFallbackView({ error, resetErrorBoundary, app, closeWindow }) {
	const modalsManager = useModalsManager();
	const { alert } = useAlert({ modalsManager });
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