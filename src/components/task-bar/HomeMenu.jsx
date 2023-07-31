import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HomeMenu.module.css";
import { faCircleInfo, faFileLines, faGear, faImage, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";
import ApplicationsManager from "../../features/applications/applications.js";
import { ReactSVG } from "react-svg";
import { closeTab } from "../../features/utils/browser.js";
import { useKeyboardListener } from "../../hooks/utils/keyboard.js";
import { useVirtualRoot } from "../../hooks/virtual-drive/VirtualRootContext.js";

export function HomeMenu({ active, setActive }) {
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();

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
		}
	}

	const onKeyUp = (event) => {
		if (event.key === "Alt" && onlyAltKey) {
			event.preventDefault();
			setActive(!active);
			onlyAltKey = false;
		} else {
			onlyAltKey = false;
		}
	}

	useKeyboardListener({ onKeyDown, onKeyUp });

	return (
		<div className={classNames.join(" ")} onKeyDown={onKeyDown}>
			<div className={styles["Container-inner"]}>
				<div className={styles.Buttons}>
					<button title="Power" onClick={() => { closeTab(); }}>
						<FontAwesomeIcon icon={faPowerOff}/>
					</button>
					<button title="Settings">
						<FontAwesomeIcon icon={faGear}/>
					</button>
					<button title="Info" onClick={() => {
						setActive(false);
						windowsManager.open("text-editor", {
							mode: "view",
							file: virtualRoot.navigate("~/Documents").findFile("info", "md")
						});
					}}>
						<FontAwesomeIcon icon={faCircleInfo}/>
					</button>
					<button title="Images" onClick={() => {
						setActive(false);
						windowsManager.open("file-explorer", { startPath: "~/Images" });
					}}>
						<FontAwesomeIcon icon={faImage}/>
					</button>
					<button title="Documents" onClick={() => {
						setActive(false);
						windowsManager.open("file-explorer", { startPath: "~/Documents" }); }
					}>
						<FontAwesomeIcon icon={faFileLines}/>
					</button>
				</div>
				<div className={styles.Apps}>
					<h2>Apps</h2>
					<div className={styles["App-list"]}>
						{ApplicationsManager.APPLICATIONS.map(({ name, id }) => 
							<button
								key={id}
								className={styles["App-button"]}
								onClick={() => {
									setActive(false);
									windowsManager.open(id);
								}}
								title={name}
							>
								<ReactSVG src={`${process.env.PUBLIC_URL}/media/applications/icons/${id}.svg`}/>
								<p>{name}</p>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}