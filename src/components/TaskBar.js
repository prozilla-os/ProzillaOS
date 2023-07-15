import { useEffect, useState } from "react";
import "./TaskBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull, faSearch, faVolumeHigh, faWifi } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";

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
				<button>
					<ReactSVG src={process.env.PUBLIC_URL + "/media/applications/icons/file-explorer.svg"}/>
				</button>
				<button>
					<ReactSVG src={process.env.PUBLIC_URL + "/media/applications/icons/terminal.svg"}/>
				</button>
				<button>
					<ReactSVG src={process.env.PUBLIC_URL + "/media/applications/icons/code-editor.svg"}/>
				</button>
				<button>
					<ReactSVG src={process.env.PUBLIC_URL + "/media/applications/icons/media-viewer.svg"}/>
				</button>
				<button>
					<ReactSVG src={process.env.PUBLIC_URL + "/media/applications/icons/browser.svg"}/>
				</button>
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
				<button id="desktop-button">

				</button>
			</div>
		</div>
	);
}