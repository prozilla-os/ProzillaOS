import { FC, forwardRef, useEffect, useState } from "react";
import styles from "./WebView.module.css";
import { WindowProps } from "../../../windows/WindowView";

interface WebViewProps extends WindowProps {
	source: string;
}

export const WebView: FC<WebViewProps> = forwardRef<HTMLIFrameElement>(({ source, focus, ...props }: WebViewProps, ref) => {
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

	return <div className={styles.Container} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
		<iframe
			ref={ref}
			src={source}
			title={props.title ?? "Web view"}
			className={styles["Web-view"]}
			referrerPolicy="no-referrer"
			sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
			{...props}
		/>
	</div>;
}) as FC;