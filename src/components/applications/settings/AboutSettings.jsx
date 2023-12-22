import { Button } from "../../utils/button/Button.jsx";
import styles from "./Settings.module.css";
import utilStyles from "../../../styles/utils.module.css";
import Vector2 from "../../../features/math/vector2.js";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext.js";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext.js";
import { NAME } from "../../../constants/branding.js";

export function AboutSettings() {
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();

	return (<>
		<div className={styles["Option"]}>
			<p className={styles["Label"]}>About {NAME}</p>
			<p className={utilStyles["Text-light"]}>{NAME} is a web-based operating system inspired by Ubuntu Linux and Windows made with React.js by Prozilla.</p>
			<div className={styles["Button-group"]}>
				<Button
					className={`${styles.Button} ${utilStyles["Text-bold"]}`}
					onClick={(event) => {
						event.preventDefault();
						windowsManager.open("text-editor", {
							mode: "view",
							file: virtualRoot.navigate("~/Documents").findFile("info", "md"),
							size: new Vector2(575, 675),
						});
					}}
				>
					Open info.md
				</Button>
				<Button
					className={`${styles.Button} ${utilStyles["Text-bold"]}`}
					href="https://github.com/Prozilla/prozilla-os"
				>
					View source
				</Button>
			</div>
		</div>
	</>);
}