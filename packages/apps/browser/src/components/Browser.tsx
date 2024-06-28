import { ChangeEventHandler, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import styles from "./Browser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faHome, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { isValidUrl, useHistory, WebView, WindowProps } from "@prozilla-os/core";
import { HOME_URL, SEARCH_URL } from "../constants/browser.const";

export interface BrowserProps extends WindowProps {
	url?: string;
}

export function Browser({ url: startUrl = HOME_URL, focus }: BrowserProps) {
	const [url, setUrl] = useState<string>(startUrl);
	const [input, setInput] = useState(startUrl);
	const { history, pushState, stateIndex, undo, redo, undoAvailable, redoAvailable } = useHistory(startUrl);
	const ref = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		if (history.length === 0)
			return;

		setUrl(history[stateIndex]);
	}, [history, stateIndex]);

	const reload = () => {
		if (ref.current == null || ref.current.contentWindow == null)
			return;

		ref.current.contentWindow.location.href = url;
	};

	const updateUrl = (newUrl: string) => {
		if (url === newUrl) {
			return reload();
		}

		setUrl(newUrl);
		setInput(newUrl);
		pushState(newUrl);
	};

	const onInputChange = (event: Event) => {
		setInput((event.target as HTMLInputElement).value);
	};

	const onKeyDown = (event: KeyboardEvent) => {
		const value = (event.target as HTMLInputElement).value;

		if (event.key === "Enter" && value !== "") {
			if (isValidUrl(value)) {
				updateUrl(value);
			} else {
				updateUrl(`${SEARCH_URL}&q=${value}`);
			}
		}
	};

	return (<div className={styles.Browser}>
		<div className={styles.Header}>
			<div className={styles.NavBar}>
				<button
					title="Back"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => { undo(); }}
					disabled={!undoAvailable}
				>
					<FontAwesomeIcon icon={faCaretLeft}/>
				</button>
				<button
					title="Forward"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => { redo(); }}
					disabled={!redoAvailable}
				>
					<FontAwesomeIcon icon={faCaretRight}/>
				</button>
				<button
					title="Reload"
					tabIndex={0}
					className={styles.IconButton}
					onClick={reload}
				>
					<FontAwesomeIcon icon={faRotateRight}/>
				</button>
				<button
					title="Home"
					tabIndex={0}
					className={styles.IconButton}
					onClick={() => { updateUrl(HOME_URL); }}
				>
					<FontAwesomeIcon icon={faHome}/>
				</button>
				<input
					value={input}
					type="text"
					aria-label="Search bar"
					className={styles.SearchBar}
					tabIndex={0}
					onChange={onInputChange as unknown as ChangeEventHandler}
					onKeyDown={onKeyDown as unknown as KeyboardEventHandler}
				/>
			</div>
			<div className={styles.Bookmarks}>

			</div>
		</div>
		<WebView ref={ref} source={url} title="Browser" focus={focus}/>
	</div>);
}