import { useEffect, useState } from "react";
import "./TaskBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull, faCamera, faCode, faFolder, faGlobe, faSearch, faTerminal, faVolumeHigh, faWifi } from "@fortawesome/free-solid-svg-icons";

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
					<FontAwesomeIcon icon={faFolder}/>
				</button>
				<button>
					<FontAwesomeIcon icon={faTerminal}/>
				</button>
				<button>
					<FontAwesomeIcon icon={faCode}/>
				</button>
				<button>
					<FontAwesomeIcon icon={faCamera}/>
				</button>
				<button>
					<FontAwesomeIcon icon={faGlobe}/>
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