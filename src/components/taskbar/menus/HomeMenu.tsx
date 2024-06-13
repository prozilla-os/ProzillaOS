import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HomeMenu.module.css";
import appStyles from "./AppList.module.css";
import taskbarStyles from "../Taskbar.module.css";
import { faCircleInfo, faFileLines, faGear, faImage, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext";
import AppsManager from "../../../features/apps/appsManager";
import { ReactSVG } from "react-svg";
import { closeViewport } from "../../../features/_utils/browser.utils";
import { useKeyboardListener } from "../../../hooks/_utils/keyboard";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext";
import { useEffect, useState } from "react";
import Vector2 from "../../../features/math/vector2";
import utilStyles from "../../../styles/utils.module.css";
import { APPS } from "../../../config/apps.config";
import { NAME } from "../../../config/branding.config";

interface HomeMenuProps {
	active: boolean;
	setActive: Function;
	search: Function;
}

export function HomeMenu({ active, setActive, search }: HomeMenuProps) {
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

	return (
		<div className={classNames.join(" ")}>
			<div className={`${styles.HomeMenu} ${taskbarStyles.Menu}`}>
				<div className={styles.Buttons}>
					<button title="Shut Down" tabIndex={tabIndex} onClick={() => { closeViewport(true); }}>
						<FontAwesomeIcon icon={faPowerOff}/>
					</button>
					<button title="Settings" tabIndex={tabIndex} onClick={() => {
						setActive(false);
						windowsManager.open("settings");
					}}>
						<FontAwesomeIcon icon={faGear}/>
					</button>
					<button title="Info" tabIndex={tabIndex} onClick={() => {
						setActive(false);
						windowsManager.open("text-editor", {
							mode: "view",
							file: virtualRoot.navigate("~/Documents/Info.md"),
							size: new Vector2(575, 675),
						});
					}}>
						<FontAwesomeIcon icon={faCircleInfo}/>
					</button>
					<button title="Images" tabIndex={tabIndex} onClick={() => {
						setActive(false);
						windowsManager.open(APPS.FILE_EXPLORER, { path: "~/Pictures" });
					}}>
						<FontAwesomeIcon icon={faImage}/>
					</button>
					<button title="Documents" tabIndex={tabIndex} onClick={() => {
						setActive(false);
						windowsManager.open(APPS.FILE_EXPLORER, { path: "~/Documents" }); }
					}>
						<FontAwesomeIcon icon={faFileLines}/>
					</button>
				</div>
				<div className={styles.Apps}>
					<h1 className={utilStyles.TextBold}>{NAME}</h1>
					<div className={appStyles.AppList}>
						{AppsManager.APPS.map(({ name, id }) => 
							<button
								key={id}
								className={appStyles.AppButton}
								tabIndex={tabIndex}
								onClick={() => {
									setActive(false);
									windowsManager.open(id);
								}}
								title={name}
							>
								<ReactSVG src={AppsManager.getAppIconUrl(id)}/>
								<h2 className={utilStyles.TextRegular}>{name}</h2>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}