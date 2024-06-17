import { useState } from "react";
import styles from "./ImagePreview.module.css";
import { ReactSVG } from "react-svg";
import { useSystemManager } from "../../../hooks";

interface ImagePreviewProps {
	source: string;
	className?: string;
	onError?: Function;
}

export function ImagePreview({ source, className, onError, ...props }: ImagePreviewProps) {
	const { virtualDriveConfig } = useSystemManager();
	const [loadingFailed, setLoadingFailed] = useState(false);

	const onLoadingError = () => {
		setLoadingFailed(true);
		onError?.();
	};

	const classNames = [styles.ImagePreview];
	if (className != null)
		classNames.push(className);

	return (<div className={classNames.join(" ")} {...props}>
		{loadingFailed
			? <ReactSVG src={virtualDriveConfig.fileIcon}/>
			: source.endsWith(".svg")
				? <ReactSVG src={source} onError={onLoadingError}/>
				: <img src={source} onError={onLoadingError} alt="Preview" draggable="false"/>
		}
	</div>);
}