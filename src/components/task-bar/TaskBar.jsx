import { useEffect, useRef, useState } from "react";
import styles from "./TaskBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ApplicationsManager from "../../features/applications/applications.js";
import { useWindows } from "../../hooks/windows/windowsContext.js";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import { ReactSVG } from "react-svg";
import Application from "../../features/applications/application.js";
import { HomeMenu } from "./menus/HomeMenu.jsx";
import OutsideClickListener from "../../hooks/utils/outsideClick.js";
import { Battery } from "./indicators/Battery.jsx";
import { Network } from "./indicators/Network.jsx";
import { Volume } from "./indicators/Volume.jsx";
import { SearchMenu } from "./menus/SearchMenu.jsx";
import { Calendar } from "./indicators/Calendar.jsx";
import { useScrollWithShadow } from "../../hooks/utils/scrollWithShadows.js";

/**
 * @param {object} props 
 * @param {Application} props.app 
 */
function AppButton({ app }) {
	const [active, setActive] = useState(false);
	const windows = useWindows();
	const windowsManager = useWindowsManager();

	useEffect(() => {
		setActive(windowsManager.isAppActive(app.id));
	}, [app.id, windows, windowsManager]);

	const classNames = [styles["App-icon"]];
	if (active)
		classNames.push(styles.Active);

	return (
		<button
			key={app.id}
			tabIndex={0}
			className={classNames.join(" ")}
			onClick={() => { windowsManager.open(app.id); }}
			title={app.name}
		>
			<ReactSVG src={`${process.env.PUBLIC_URL}/media/applications/icons/${app.id}.svg`}/>
		</button>
	);
}

export function Taskbar() {
	const [showHome, setShowHome] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const ref = useRef(null);
	const { boxShadow, onUpdate } = useScrollWithShadow({
		ref,
		shadow: {
			offset: 20,
			blurRadius: 10,
			spreadRadius: -10,
			color: {
				a: 25
			}
		} 
	});
	const inputRef = useRef(null);

	const updateShowHome = (value) => {
		setShowHome(value);

		if (value) {
			setShowSearch(false);
		}
	};

	const updateShowSearch = (value) => {
		setShowSearch(value);

		if (value) {
			if (searchQuery !== "") {
				setSearchQuery("");
			}

			setShowHome(false);
			
			if (inputRef.current) {
				inputRef.current.focus();
				window.scrollTo(0, document.body.scrollHeight);
			}
		} else {
			setTimeout(() => {
				if (!showSearch) {
					setSearchQuery("");
				}
			}, 200);
		}
	};

	const search = (query) => {
		updateShowSearch(true);
	};

	return (
		<div className={styles["Task-bar"]}>
			<div className={styles["Menu-icons"]}>
				<div className={styles["Home-container"]}>
					<OutsideClickListener onOutsideClick={() => { updateShowHome(false); }}>
						<button
							title="Home"
							tabIndex={0}
							className={`${styles["Menu-button"]} ${styles["Home-button"]}`}
							onClick={() => { updateShowHome(!showHome); }}
						>
							<ReactSVG src={process.env.PUBLIC_URL + "/media/logo.svg"}/>
						</button>
						<HomeMenu active={showHome} setActive={updateShowHome} search={search}/>
					</OutsideClickListener>
				</div>
				<div className={styles["Search-container"]}>
					<OutsideClickListener onOutsideClick={() => { updateShowSearch(false); }}>
						<button
							title="Search"
							tabIndex={0}
							className={`${styles["Menu-button"]} ${styles["Search-button"]}`}
							onClick={() => { updateShowSearch(!showSearch); }}
						>
							<FontAwesomeIcon icon={faSearch}/>
						</button>
						<SearchMenu
							active={showSearch}
							setActive={updateShowSearch}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							inputRef={inputRef}
						/>
					</OutsideClickListener>
				</div>
			</div>
			<div className={styles["App-icons"]} style={{ boxShadow }}>
				<div className={styles["App-icons-inner"]} onScroll={onUpdate} onResize={onUpdate} ref={ref}>
					{ApplicationsManager.APPLICATIONS.map((app) => 
						<AppButton app={app} key={app.id}/>
					)}
				</div>
			</div>
			<div className={styles["Util-icons"]}>
				<Battery/>
				<Network/>
				<Volume/>
				<Calendar/>
				<button title="View Desktop" id="desktop-button"/>
			</div>
		</div>
	);
}