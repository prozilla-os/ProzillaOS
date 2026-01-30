import { CSSProperties, memo, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./Taskbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import { HomeMenu } from "./menus/HomeMenu";
import { OutsideClickListener } from "../../hooks/_utils/outsideClick";
import { SearchMenu } from "./menus/SearchMenu";
import { useScrollWithShadow } from "../../hooks/_utils/scrollWithShadows";
import { AppButton } from "./app-icon/AppIcon";
import { useContextMenu } from "../../hooks/modals/contextMenu";
import { Actions } from "../actions/Actions";
import { ClickAction } from "../actions/actions/ClickAction";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext";
import { useSettingsManager } from "../../hooks/settings/settingsManagerContext";
import { SettingsManager } from "../../features/settings/settingsManager";
import { useWindows } from "../../hooks/windows/windowsContext";
import { ZIndexManager } from "../../features/z-index/zIndexManager";
import { useZIndex } from "../../hooks/z-index/zIndex";
import { Battery, Calendar, Network, Volume } from "./indicators";
import { useClassNames, useSystemManager } from "../../hooks";
import { App, AppsConfig } from "../../features";

/**
 * Component that renders the start and search menus, pinned applications and various indicators.
 */
export const Taskbar = memo(() => {
	const { systemName, taskbarConfig, appsConfig, skin } = useSystemManager();
	const ref = useRef<HTMLDivElement>(null);
	const settingsManager = useSettingsManager();
	const [showHome, setShowHome] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [hideUtilMenus, setHideUtilMenus] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const { boxShadow, onUpdate } = useScrollWithShadow({ ref: ref, shadow: {
		offset: 20,
		blurRadius: 10,
		spreadRadius: -10,
		color: { a: 25 },
	} });
	const inputRef = useRef<HTMLInputElement>(null);
	const windowsManager = useWindowsManager();
	const windows = useWindows();
	const [apps, setApps] = useState<App[]>([]);
	const zIndex = useZIndex({ groupIndex: ZIndexManager.GROUPS.TASKBAR, index: 0 });

	const settingsApp = appsConfig.getAppByRole(AppsConfig.APP_ROLES.settings);

	const { onContextMenu } = useContextMenu({ Actions: (props) =>
		<Actions avoidTaskbar={false} {...props}>
			{settingsApp != null && 
				<ClickAction label={`Open ${settingsApp.name}`} icon={settingsApp.iconUrl as string | undefined} onTrigger={() => {
					windowsManager?.open(settingsApp.id);
				}}/>
			}
		</Actions>,
	});

	useEffect(() => {
		const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.taskbar);
		void settings?.get("pins", (pinList: string) => {
			const pins = pinList.split(",");

			const newApps = appsConfig.apps.sort((appA, appB) => {
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
				app.isPinned = pins.includes(app.id);
				return app;
			});
			setApps(newApps);
		});
	}, [settingsManager]);

	const updateShowHome = (show: boolean) => {
		setShowHome(show);

		if (show) {
			setShowSearch(false);
			setHideUtilMenus(true);
		}
	};

	const updateShowSearch = (show: boolean) => {
		setShowSearch(show);

		if (show) {
			if (searchQuery !== "") {
				setSearchQuery("");
			}

			setShowHome(false);
			setHideUtilMenus(true);
			
			if (inputRef.current) {
				(inputRef.current as HTMLElement).focus();
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

	const showUtilMenu = () => {
		setShowHome(false);
		setShowSearch(false);
		setHideUtilMenus(false);
	};

	const search = (_query: string) => {
		updateShowSearch(true);
	};

	return <div
		style={{ "--taskbar-height": `${taskbarConfig.height}px`, zIndex } as CSSProperties}
		className={useClassNames([styles.Taskbar], "Taskbar")}
		data-allow-context-menu={true}
		onContextMenu={(event) => {
			if ((event.target as HTMLElement).getAttribute("data-allow-context-menu"))
				onContextMenu(event as unknown as MouseEvent<HTMLElement, MouseEvent>);
		}}
	>
		<div className={useClassNames([styles.MenuIcons], "Taskbar", "MenuIcons")}>
			<div className={styles.HomeContainer}>
				<OutsideClickListener onOutsideClick={() => { updateShowHome(false); }}>
					<button
						className={useClassNames([styles.MenuButton, styles.HomeButton], "Taskbar", "HomeIcon")}
						title="Home"
						tabIndex={0}
						onClick={() => { updateShowHome(!showHome); }}
					>
						{skin.systemIcon.endsWith(".svg")
							? <ReactSVG src={skin.systemIcon}/>
							: <img src={skin.systemIcon} alt={systemName}/>
						}
					</button>
					<HomeMenu active={showHome} setActive={updateShowHome} search={search}/>
				</OutsideClickListener>
			</div>
			<div className={styles.SearchContainer}>
				<OutsideClickListener onOutsideClick={() => { updateShowSearch(false); }}>
					<button
						className={useClassNames([styles.MenuButton], "Taskbar", "SearchIcon")}
						title="Search"
						tabIndex={0}
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
		<div className={useClassNames([styles.AppIconsContainer], "Taskbar", "AppIcons")} data-allow-context-menu={true} style={{ boxShadow }}>
			<div
				className={styles.AppIcons}
				data-allow-context-menu={true}
				onScroll={onUpdate}
				ref={ref}
			>
				{apps.map((app) => {
					if (windows == null) return;

					const isActive = windows.map((window) => window.app?.id).includes(app.id);
					const shouldBeShown = (app.isPinned || isActive);
					return (<AppButton
						windowsManager={windowsManager}
						app={app} 
						key={app.id}
						active={isActive}
						visible={shouldBeShown}
					/>);
				})}
			</div>
		</div>
		<div className={useClassNames([styles.UtilIcons], "Taskbar", "UtilIcons")}>
			<Battery showUtilMenu={showUtilMenu} hideUtilMenus={hideUtilMenus}/>
			<Network showUtilMenu={showUtilMenu} hideUtilMenus={hideUtilMenus}/>
			<Volume showUtilMenu={showUtilMenu} hideUtilMenus={hideUtilMenus}/>
			<Calendar showUtilMenu={showUtilMenu} hideUtilMenus={hideUtilMenus}/>
			<button
				title="Show Desktop"
				className={useClassNames([styles.DesktopButton], "Taskbar", "UtilIcon", "Desktop")}
				onClick={() => { windowsManager?.minimizeAll(); }}
			/>
		</div>
	</div>;
});