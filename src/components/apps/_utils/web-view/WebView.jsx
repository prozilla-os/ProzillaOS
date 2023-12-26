import { forwardRef, useEffect, useState } from "react";
import styles from "./WebView.module.css";

/**
 * @param {object} props
 * @param {string} props.source
 */
export const WebView = forwardRef(({ source, focus, ...props }, ref) => {
	const [hovered, setHovered] = useState(false);

	useEffect(() => {
		window.focus();

		const onBlur = (event) => {
			if (hovered) {
				focus?.(event);
			}
		};

		window.addEventListener("blur", onBlur);

		return () => {
			window.removeEventListener("blur", onBlur);
		};
	}, [focus, hovered]);

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
				ref={ref}
				src={source}
				title={props.title ?? "Web view"}
				className={styles["Web-view"]}
				referrerPolicy="no-referrer"
				sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
				{...props}
			/>
		</div>
		
	);
});