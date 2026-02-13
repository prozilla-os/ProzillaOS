import { useState } from "react";
import styles from "./ImagePreview.module.css";
import { ReactSVG } from "react-svg";
import { useSkin } from "../../../hooks";
import { VectorImage } from "../vector-image/VectorImage";

export interface ImagePreviewProps {
	source: string;
	className?: string;
	onError?: () => void;
}

export function ImagePreview({ source, className, onError, ...props }: ImagePreviewProps) {
	const skin = useSkin();
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
			? <ReactSVG src={skin.fileIcons.generic}/>
			: <VectorImage src={source} onError={onLoadingError}/>
		}
	</div>);
}