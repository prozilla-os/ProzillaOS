import { useEffect, useRef, useState } from "react";
import styles from "./Browser.module.css";
import { WebView } from "../_utils/web-view/WebView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faHome, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { HOME_URL, SEARCH_URL } from "../../../config/apps/browser.config";
import { isValidUrl } from "../../../features/_utils/browser.utils";
import { useHistory } from "../../../hooks/_utils/history";

/** @type {import("../../windows/WindowView.jsx").windowProps} */
export function Browser({ startUrl, focus }) {
	const initialUrl = startUrl ?? HOME_URL;

	const [url, setUrl] = useState(initialUrl);
	const [input, setInput] = useState(initialUrl);
	const { history, pushState, stateIndex, undo, redo, undoAvailable, redoAvailable } = useHistory(initialUrl);
	const ref = useRef(null);

	useEffect(() => {
		if (history.length === 0)
			return;

		setUrl(history[stateIndex]);
	}, [history, stateIndex]);

	const reload = () => {
		if (ref.current == null)
			return;

		ref.current.contentWindow.location.href = url;
	};

	const updateUrl = (newUrl) => {
		if (url === newUrl) {
			return reload();
		}

		setUrl(newUrl);
		setInput(newUrl);
		pushState(newUrl);
	};

	const onInputChange = (event) => {
		setInput(event.target.value);
	};

	const onKeyDown = (event) => {
		const value = event.target.value;

		if (event.key === "Enter" && value !== "") {
			if (isValidUrl(value)) {
				updateUrl(value);
			} else {
				updateUrl(`${SEARCH_URL}&q=${value}`);
			}
		}
	};

	return (<div className={styles.Container}>
		<div className={styles.Header}>
			<div className={styles["Nav-bar"]}>
				<button
					title="Back"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={undo}
					disabled={!undoAvailable}
				>
					<FontAwesomeIcon icon={faCaretLeft}/>
				</button>
				<button
					title="Forward"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={redo}
					disabled={!redoAvailable}
				>
					<FontAwesomeIcon icon={faCaretRight}/>
				</button>
				<button
					title="Reload"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={reload}
				>
					<FontAwesomeIcon icon={faRotateRight}/>
				</button>
				<button
					title="Home"
					tabIndex={0}
					className={styles["Icon-button"]}
					onClick={() => { updateUrl(HOME_URL); }}
				>
					<FontAwesomeIcon icon={faHome}/>
				</button>
				<input
					value={input}
					type="text"
					aria-label="Search bar"
					className={styles["Search-bar"]}
					tabIndex={0}
					onChange={onInputChange}
					onKeyDown={onKeyDown}
				/>
			</div>
			<div className={styles["Bookmarks"]}>

			</div>
		</div>
		<WebView ref={ref} source={url} title="Browser" focus={focus}/>
	</div>);
}