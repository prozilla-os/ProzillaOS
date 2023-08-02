import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Network() {
	return (
		<button title="Wifi">
			<FontAwesomeIcon icon={faWifi}/>
		</button>
	);
}