import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HomeMenu.module.css";
import appStyles from "./AppList.module.css";
import { faCircleInfo, faFileLines, faGear, faImage, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext.js";
import AppsManager from "../../../features/apps/appsManager.js";
import { ReactSVG } from "react-svg";
import { closeViewport } from "../../../features/utils/browser.utils.js";
import { useKeyboardListener } from "../../../hooks/utils/keyboard.js";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext.js";
import { useEffect, useState } from "react";
import Vector2 from "../../../features/math/vector2.js";
import utilStyles from "../../../styles/utils.module.css";
import { APPS } from "../../../config/apps.config.js";
import { NAME } from "../../../config/branding.config.js";

/**
 * @param {object} props 
 * @param {boolean} props.active
 * @param {Function} props.setActive
 * @param {Function} props.search
 */
export function HomeMenu({ active, setActive, search }) {
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();
	const [tabIndex, setTabIndex] = useState(active ? 0 : -1);

	useEffect(() => {
		setTabIndex(active ? 0 : -1);
	}, [active]);

	const classNames = [styles["Container-outer"]];
	if (active)
		classNames.push(styles.Active);

	let onlyAltKey = false;
	const onKeyDown = (event) => {
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

	const onKeyUp = (event) => {
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
			<div className={styles["Container-inner"]}>
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
							file: virtualRoot.navigate("~/Documents/info.md"),
							size: new Vector2(575, 675),
						});
					}}>
						<FontAwesomeIcon icon={faCircleInfo}/>
					</button>
					<button title="Images" tabIndex={tabIndex} onClick={() => {
						setActive(false);
						windowsManager.open(APPS.FILE_EXPLORER, { startPath: "~/Pictures" });
					}}>
						<FontAwesomeIcon icon={faImage}/>
					</button>
					<button title="Documents" tabIndex={tabIndex} onClick={() => {
						setActive(false);
						windowsManager.open(APPS.FILE_EXPLORER, { startPath: "~/Documents" }); }
					}>
						<FontAwesomeIcon icon={faFileLines}/>
					</button>
				</div>
				<div className={styles.Apps}>
					<h1 className={utilStyles["Text-bold"]}>{NAME}</h1>
					<div className={appStyles["App-list"]}>
						{AppsManager.APPS.map(({ name, id }) => 
							<button
								key={id}
								className={appStyles["App-button"]}
								tabIndex={tabIndex}
								onClick={() => {
									setActive(false);
									windowsManager.open(id);
								}}
								title={name}
							>
								<ReactSVG src={AppsManager.getAppIconUrl(id)}/>
								<h2 className={utilStyles["Text-regular"]}>{name}</h2>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}