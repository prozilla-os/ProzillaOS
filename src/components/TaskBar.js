import { useEffect, useState } from "react";
import "./TaskBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull, faSearch, faVolumeHigh, faWifi } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import ApplicationsManager from "../modules/applications/applications.js";
import { windowsManager } from "../App.js";

export function TaskBar() {
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
				{ApplicationsManager.APPLICATIONS.forEach((app) => 
					<button key={app.id} onClick={windowsManager.open(app.id)}>
						<ReactSVG src={process.env.PUBLIC_URL + `/media/applications/icons/${app.id}.svg`}/>
					</button>
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
				<button>
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