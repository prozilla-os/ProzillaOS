/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useWindows } from "../../hooks/WindowsContext.js";
import { useWindowsManager } from "../../hooks/WindowsManagerContext.js";
import { ReactSVG } from "react-svg";
import styles from "../TaskBar.module.css";

export function AppButton({ app }) {
	const [active, setActive] = useState(false);
	const windows = useWindows();
	const windowsManager = useWindowsManager();

	useEffect(() => {
		setActive(windowsManager.isAppActive(app.id));
	}, [windows]);

	return (<button className={active ? `${styles["App-icon"]} ${styles["Active"]}` : styles["App-icon"]} key={app.id} onClick={() => { windowsManager.open(app.id); }}>
		<ReactSVG src={process.env.PUBLIC_URL + `/media/applications/icons/${app.id}.svg`}/>
	</button>);
}