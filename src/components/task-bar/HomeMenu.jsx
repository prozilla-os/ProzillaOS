import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HomeMenu.module.css";
import { faCircleInfo, faFileLines, faGear, faImage, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";
import ApplicationsManager from "../../features/applications/applications.js";
import { ReactSVG } from "react-svg";
import { closeTab } from "../../features/utils/browser.js";

export function HomeMenu({ active, setActive }) {
	const windowsManager = useWindowsManager();

	const classNames = [styles["Container-outer"]];
	if (active)
		classNames.push(styles.Active);

	return (
		<div className={classNames.join(" ")}>
			<div className={styles["Container-inner"]}>
				<div className={styles.Buttons}>
					<button title="Power" onClick={() => { closeTab(); }}>
						<FontAwesomeIcon icon={faPowerOff}/>
					</button>
					<button title="Settings">
						<FontAwesomeIcon icon={faGear}/>
					</button>
					<button title="Info">
						<FontAwesomeIcon icon={faCircleInfo}/>
					</button>
					<button title="Images" onClick={() => {
						setActive(false);
						windowsManager.open("file-explorer", { startPath: "~/Images" }); }
					}>
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