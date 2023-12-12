import { useState } from "react";
import styles from "./ImagePreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";

export function ImagePreview({ source }) {
	const [loadingFailed, setLoadingFailed] = useState(false);

	if (loadingFailed)
		return <FontAwesomeIcon icon={faFile}/>;

	return (<div className={styles["Image-preview"]}>
		{source.endsWith(".svg")
			? <ReactSVG src={source}/>
			: <img src={source} onError={() => { setLoadingFailed(true); }} alt="Preview" draggable="false"/>
		}
	</div>);
}