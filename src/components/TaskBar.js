import { useEffect, useState } from "react";
import "./TaskBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull, faSearch, faVolumeHigh, faWifi } from "@fortawesome/free-solid-svg-icons";
import ApplicationsManager from "../features/applications/applications.js";
import { AppButton } from "./task-bar/AppButton.js";

export function Taskbar() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		setInterval(() => {
			setDate(new Date());
		}, 30000);
	}, []);

	return (
		<div className="Task-bar">
			<div className="Program-icons">
				<button>
					<FontAwesomeIcon icon={faSearch}/>
				</button>
				{ApplicationsManager.APPLICATIONS.map((app) => 
					<AppButton app={app} key={app.id}/>
				)}
			</div>
			<div className="Util-icons">
				<button>
					<FontAwesomeIcon icon={faBatteryFull}/>
				</button>
				<button>
					<FontAwesomeIcon icon={faWifi}/>
				</button>
				<button>
					<FontAwesomeIcon icon={faVolumeHigh}/>
				</button>
				<button style={{ userSelect: "none" }}>
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
				<button id="desktop-button"/>
			</div>
		</div>
	);
}