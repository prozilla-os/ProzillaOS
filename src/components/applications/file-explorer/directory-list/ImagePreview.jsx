import { useState } from "react";
import styles from "./ImagePreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";

export function ImagePreview({ source, className, ...props }) {
	const [loadingFailed, setLoadingFailed] = useState(false);

	if (loadingFailed)
		return <FontAwesomeIcon icon={faFile}/>;

	const classNames = [styles["Image-preview"]];
	if (className != null)
		classNames.push(className);

	return (<div className={classNames.join(" ")} {...props}>
		{source.endsWith(".svg")
			? <ReactSVG src={source}/>
			: <img src={source} onError={() => { setLoadingFailed(true); }} alt="Preview" draggable="false"/>
		}
	</div>);
}