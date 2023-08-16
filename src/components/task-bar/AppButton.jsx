import { memo, useEffect, useState } from "react";
import Application from "../../features/applications/application.js";
import { useWindows } from "../../hooks/windows/windowsContext.js";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import styles from "./TaskBar.module.css";
import { ReactSVG } from "react-svg";

/**
 * @param {object} props 
 * @param {Application} props.app 
 */
export const AppButton = memo(({ app }) => {
	const [active, setActive] = useState(false);
	const windows = useWindows();
	const windowsManager = useWindowsManager();

	useEffect(() => {
		setActive(windowsManager.isAppActive(app.id));
	}, [app.id, windows, windowsManager]);

	const classNames = [styles["App-icon"]];
	if (active)
		classNames.push(styles.Active);

	return (
		<button
			key={app.id}
			tabIndex={0}
			className={classNames.join(" ")}
			onClick={() => { windowsManager.open(app.id); }}
			title={app.name}
		>
			<ReactSVG src={`${process.env.PUBLIC_URL}/media/applications/icons/${app.id}.svg`}/>
		</button>
	);
});