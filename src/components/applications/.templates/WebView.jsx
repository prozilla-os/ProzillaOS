import { useCallback, useEffect, useState } from "react";
import styles from "./WebView.module.css";

/**
 * @param {Object} props
 * @param {String} props.source
 */
export function WebView(props) {
	const [hovered, setHovered] = useState(false);

	const { source, focus } = props;

	useEffect(() => {
		window.focus();

		const onBlur = (event) => {
			if (hovered) {
				focus(event);
			}
		};

		window.addEventListener("blur", onBlur);

		return () => {
			window.removeEventListener("blur", onBlur);
		};
	}, [hovered]);

	const onMouseOver = () => {
		setHovered(true);
	};

	const onMouseOut = () => {
		window.focus();
		setHovered(false);
	};

	return (
		<div className={styles.Container} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
			<iframe
				src={source}
				className={styles["Web-view"]}
			/>
		</div>
		
	);
}