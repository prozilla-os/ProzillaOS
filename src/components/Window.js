import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Window.css";
import { faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { ReactSVG } from "react-svg";

export function Window({ app, size, position, focused = false, minimized = false, maximized = false }) {
	return (
		<div
			className="Window-container"
			style={{
				width: size.x,
				height: size.y,
				left: position.x,
				top: position.y,
			}}
		>
			<div className="Header">
				<ReactSVG className="Window-icon" src={process.env.PUBLIC_URL + `/media/applications/icons/${app.id}.svg`}/>
				<p>{app.name}</p>
				<button>
					<FontAwesomeIcon icon={faMinus}/>
				</button>
				<button>
					<FontAwesomeIcon icon={faSquare}/>
				</button>
				<button>
					<FontAwesomeIcon icon={faXmark}/>
				</button>
			</div>
			<div className="Window-content">
				
			</div>
		</div>
	);
}