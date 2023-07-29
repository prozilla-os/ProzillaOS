import { useEffect, useState } from "react";
import styles from "./TaskBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull, faSearch, faVolumeHigh, faWifi } from "@fortawesome/free-solid-svg-icons";
import ApplicationsManager from "../../features/applications/applications.js";
import { useWindows } from "../../hooks/windows/WindowsContext.js";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";
import { ReactSVG } from "react-svg";
// eslint-disable-next-line no-unused-vars
import Application from "../../features/applications/application.js";

/**
 * @param {Object} props 
 * @param {Application} props.app 
 */
function AppButton({ app }) {
	const [active, setActive] = useState(false);
	const windows = useWindows();
	const windowsManager = useWindowsManager();

	useEffect(() => {
		setActive(windowsManager.isAppActive(app.id));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [windows]);

	const classNames = [styles["App-icon"]];
	if (active)
		classNames.push(styles.Active);

	return (
		<button
			className={classNames.join(" ")}
			onClick={() => { windowsManager.open(app.id); }}
			title={app.name}
		>
			<ReactSVG src={process.env.PUBLIC_URL + `/media/applications/icons/${app.id}.svg`}/>
		</button>
	);
}

export function Taskbar() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		setInterval(() => {
			setDate(new Date());
		}, 30000);
	}, []);

	return (
		<div className={styles["Task-bar"]}>
			<div className={styles["Program-icons"]}>
				<button title="Search">
					<FontAwesomeIcon icon={faSearch}/>
				</button>
				{ApplicationsManager.APPLICATIONS.map((app) => 
					<AppButton app={app} key={app.id}/>
				)}
			</div>
			<div className={styles["Util-icons"]}>
				<button title="Battery">
					<FontAwesomeIcon icon={faBatteryFull}/>
				</button>
				<button title="Wifi">
					<FontAwesomeIcon icon={faWifi}/>
				</button>
				<button title="Volume">
					<FontAwesomeIcon icon={faVolumeHigh}/>
				</button>
				<button title="Date & Time" style={{ userSelect: "none" }}>
					{date.toLocaleString("en-US", {
						hour: "numeric",
						minute: "numeric",
						hour12: false,
					})}
					<br/>
					{date.toLocaleDateString("en-GB", {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
				</button>
				<button title="View Desktop" id="desktop-button"/>
			</div>
		</div>
	);
}