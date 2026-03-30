import { forwardRef, MouseEvent, useEffect, useState } from "react";
import styles from "./WebView.module.css";
import { WindowProps } from "../../windows/WindowView";

export interface WebViewProps extends WindowProps {
	/** The URL of the external application. */
	source?: string;
	title?: string;
}

/**
 * Component that renders an external application inside an iframe.
 */
export const WebView = forwardRef<HTMLIFrameElement, WebViewProps>(({ source, focus, ...props }: WebViewProps, ref) => {
	const [hovered, setHovered] = useState(false);

	useEffect(() => {
		window.focus();
		const onBlur = (event: Event) => {
			if (hovered) {
				focus?.(event, true);
			}
		};

		window.addEventListener("blur", onBlur);

		return () => {
			window.removeEventListener("blur", onBlur);
		};
	}, [focus, hovered]);

	const onMouseOver = (_event: MouseEvent) => {
		setHovered(true);
	};

	const onMouseOut = (_event: MouseEvent) => {
		window.focus();
		setHovered(false);
	};

	const iframeProps = { ...props };

	delete iframeProps.active;
	delete iframeProps.close;
	delete iframeProps.setTitle;
	delete iframeProps.setIconUrl;
	delete iframeProps.standalone;

	return <div className={styles.WebView} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
		<iframe
			ref={ref}
			src={source}
			referrerPolicy="no-referrer"
			sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
			{...iframeProps}
		/>
	</div>;
});