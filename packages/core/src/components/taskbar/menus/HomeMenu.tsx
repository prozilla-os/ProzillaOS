import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HomeMenu.module.css";
import appStyles from "./AppList.module.css";
import taskbarStyles from "../Taskbar.module.css";
import { faCircleInfo, faFileLines, faGear, faImage, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import { useEffect, useState } from "react";
import { AppsConfig, closeViewport, Vector2 } from "../../../features";
import { useWindowsManager, useVirtualRoot, useKeyboardListener, useSystemManager, useClassNames } from "../../../hooks";
import { utilStyles } from "../../../styles";
import { VectorImage } from "../../_utils/vector-image/VectorImage";

interface HomeMenuProps {
	active: boolean;
	setActive: Function;
	search: Function;
}

export function HomeMenu({ active, setActive, search }: HomeMenuProps) {
	const { systemName, appsConfig } = useSystemManager();
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();
	const [tabIndex, setTabIndex] = useState(active ? 0 : -1);

	useEffect(() => {
		setTabIndex(active ? 0 : -1);
	}, [active]);

	const classNames = [styles.HomeMenuContainer, taskbarStyles.MenuContainer];
	if (active)
		classNames.push(taskbarStyles.Active);

	let onlyAltKey = false;
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Alt") {
			event.preventDefault();
			onlyAltKey = true;
		} else {
			onlyAltKey = false;

			if (active && event.key.length === 1) {
				search(event.key);
			}
		}
	};

	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === "Alt" && onlyAltKey) {
			event.preventDefault();
			setActive(!active);
			onlyAltKey = false;
		} else {
			onlyAltKey = false;
		}
	};

	useKeyboardListener({ onKeyDown, onKeyUp });

	const fileExplorerApp = appsConfig.getAppByRole(AppsConfig.APP_ROLES.FileExplorer);
	const settingsApp = appsConfig.getAppByRole(AppsConfig.APP_ROLES.Settings);
	const textEditorApp = appsConfig.getAppByRole(AppsConfig.APP_ROLES.TextEditor);

	return (
		<div className={classNames.join(" ")}>
			<div className={useClassNames([styles.HomeMenu, taskbarStyles.Menu], "Taskbar", "Menu", "Home")}>
				<div className={styles.Buttons}>
					<button tabIndex={tabIndex} onClick={() => { closeViewport(true, systemName); }}>
						<FontAwesomeIcon icon={faPowerOff}/>
						<p className={utilStyles.TextRegular}>Shut down</p>
					</button>
					{settingsApp != null &&
						<button tabIndex={tabIndex} onClick={() => {
							setActive(false);
							windowsManager?.open("settings");
						}}>
							<FontAwesomeIcon icon={faGear}/>
							<p className={utilStyles.TextRegular}>Settings</p>
						</button>
					}
					{textEditorApp != null &&
						<button tabIndex={tabIndex} onClick={() => {
							setActive(false);
							windowsManager?.open("text-editor", {
								mode: "view",
								file: virtualRoot?.navigate("~/Documents/Info.md"),
								size: new Vector2(575, 675),
							});
						}}>
							<FontAwesomeIcon icon={faCircleInfo}/>
							<p className={utilStyles.TextRegular}>Info</p>
						</button>
					}
					{fileExplorerApp != null && <>
						<button tabIndex={tabIndex} onClick={() => {
							setActive(false);
							windowsManager?.open(fileExplorerApp.id, { path: "~/Pictures" });
						}}>
							<FontAwesomeIcon icon={faImage}/>
							<p className={utilStyles.TextRegular}>Images</p>
						</button>
						<button tabIndex={tabIndex} onClick={() => {
							setActive(false);
							windowsManager?.open(fileExplorerApp.id, { path: "~/Documents" }); }
						}>
							<FontAwesomeIcon icon={faFileLines}/>
							<p className={utilStyles.TextRegular}>Documents</p>
						</button>
					</>}
				</div>
				<div className={styles.Apps}>
					<span className={styles.Logo}>
						<ReactSVG src={"/assets/logo.svg"}/>
						<h1 className={utilStyles.TextBold}>{systemName}</h1>
					</span>
					<div className={appStyles.AppList}>
						{appsConfig.apps.sort((a, b) => a.name.localeCompare(b.name)).map(({ name, id, iconUrl }) => 
							<button
								key={id}
								className={appStyles.AppButton}
								tabIndex={tabIndex}
								onClick={() => {
									setActive(false);
									windowsManager?.open(id);
								}}
								title={name}
							>
								<VectorImage src={iconUrl ?? ""}/>
								<h2 className={utilStyles.TextRegular}>{name}</h2>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}