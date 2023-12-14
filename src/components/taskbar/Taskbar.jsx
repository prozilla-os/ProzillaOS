import { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Taskbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import AppsManager from "../../features/applications/applications.js";
import { ReactSVG } from "react-svg";
import { HomeMenu } from "./menus/HomeMenu.jsx";
import OutsideClickListener from "../../hooks/utils/outsideClick.js";
import { Battery } from "./indicators/Battery.jsx";
import { Network } from "./indicators/Network.jsx";
import { Volume } from "./indicators/Volume.jsx";
import { SearchMenu } from "./menus/SearchMenu.jsx";
import { Calendar } from "./indicators/Calendar.jsx";
import { useScrollWithShadow } from "../../hooks/utils/scrollWithShadows.js";
import { AppButton } from "./app-icon/AppIcon.jsx";
import { useContextMenu } from "../../hooks/modals/contextMenu.js";
import { Actions } from "../actions/Actions.jsx";
import { useModals } from "../../hooks/modals/modals.js";
import { ClickAction } from "../actions/actions/ClickAction.jsx";
import { APPS, APP_NAMES } from "../../constants/applications.js";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import { ModalsView } from "../modals/ModalsView.jsx";
import { TASKBAR_HEIGHT } from "../../constants/taskBar.js";
import { useSettingsManager } from "../../hooks/settings/settingsManagerContext.js";
import { SettingsManager } from "../../features/settings/settingsManager.js";
import { useWindows } from "../../hooks/windows/windowsContext.js";

export const Taskbar = memo(() => {
	const ref = useRef(null);
	const settingsManager = useSettingsManager();
	const [showHome, setShowHome] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const { boxShadow, onUpdate } = useScrollWithShadow({ ref, shadow: {
		offset: 20,
		blurRadius: 10,
		spreadRadius: -10,
		color: { a: 25 }
	} });
	const inputRef = useRef(null);
	const [modalsManager, modals] = useModals();
	const windowsManager = useWindowsManager();
	const windows = useWindows();
	const { onContextMenu } = useContextMenu({ modalsManager, Actions: (props) =>
		<Actions avoidTaskbar={false} {...props}>
			<ClickAction label={`Open ${APP_NAMES.SETTINGS}`} icon={faCog} onTrigger={() => {
				windowsManager.open(APPS.SETTINGS);
			}}/>
		</Actions>
	});
	const [pins, setPins] = useState([]);

	const apps = useMemo(() => AppsManager.APPLICATIONS.sort((appA, appB) => {
		const indexA = pins.indexOf(appA.id);
		const indexB = pins.indexOf(appB.id);
		if (indexA < 0 && indexB > 0) {
			return 1;
		} else if (indexA > 0 && indexB < 0) {
			return -1;
		} else if (indexA < 0 && indexB < 0) {
			return 0;
		} else {
			return indexA - indexB;
		}
	}).map((app) => {
		const isActive = windows.map((window) => window.app.id).includes(app.id);
		const shouldBeShown = (pins.includes(app.id) || isActive);
		return (<AppButton
			modalsManager={modalsManager}
			pins={pins}
			app={app} 
			key={app.id}
			active={isActive}
			visible={shouldBeShown}
		/>);
	}), [modalsManager, pins, windows]);

	useEffect(() => {
		(async () => {
			const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.taskbar);
			settings.get("pins", (pins) => {
				setPins(pins.split(","));
			});
		})();
	}, [settingsManager]);

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

	return (<>
		<ModalsView modalsManager={modalsManager} modals={modals}/>
		<div
			style={{ "--taskbar-height": `${TASKBAR_HEIGHT}px` }}
			className={styles["Taskbar"]}
			data-allow-context-menu={true}
			onContextMenu={(event) => {
				if (event.target.getAttribute("data-allow-context-menu"))
					onContextMenu(event);
			}}
		>
			<div className={styles["Menu-icons"]}>
				<div className={styles["Home-container"]}>
					<OutsideClickListener onOutsideClick={() => { updateShowHome(false); }}>
						<button
							title="Home"
							tabIndex={0}
							className={`${styles["Menu-button"]} ${styles["Home-button"]}`}
							onClick={() => { updateShowHome(!showHome); }}
						>
							<ReactSVG src={process.env.PUBLIC_URL + "/assets/logo.svg"}/>
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
			<div className={styles["App-icons"]} data-allow-context-menu={true} style={{ boxShadow }}>
				<div
					className={styles["App-icons-inner"]}
					data-allow-context-menu={true}
					onScroll={onUpdate}
					onResize={onUpdate}
					ref={ref}
				>
					{apps}
				</div>
			</div>
			<div className={styles["Util-icons"]}>
				<Battery/>
				<Network/>
				<Volume/>
				<Calendar/>
				<button title="Show Desktop" id="desktop-button"/>
			</div>
		</div>
	</>);
}, []);