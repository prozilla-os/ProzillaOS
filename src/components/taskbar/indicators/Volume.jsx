import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Volume() {
	return (
		<button title="Volume" tabIndex={0}>
			<FontAwesomeIcon icon={faVolumeHigh}/>
		</button>
	);
}