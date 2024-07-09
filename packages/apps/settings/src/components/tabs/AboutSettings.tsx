import styles from "../Settings.module.css";
import { Button, useSystemManager, useVirtualRoot, useWindowsManager, utilStyles, Vector2 } from "@prozilla-os/core";

export function AboutSettings() {
	const { systemName } = useSystemManager();
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();

	return <div className={styles.Option}>
		<p className={styles.Label}>About {systemName}</p>
		<p className={utilStyles.TextLight}>{systemName} is a web-based operating system inspired by Ubuntu Linux and Windows made with React.js by Prozilla.</p>
		<div className={styles.ButtonGroup}>
			<Button
				className={`${styles.Button} ${utilStyles.TextBold}`}
				onClick={(event: Event) => {
					event.preventDefault();
					windowsManager?.open("text-editor", {
						mode: "view",
						file: virtualRoot?.navigate("~/Documents/Info.md"),
						size: new Vector2(575, 675),
					});
				}}
			>
				Open Info.md
			</Button>
			<Button
				className={`${styles.Button} ${utilStyles.TextBold}`}
				href="https://github.com/prozilla-os/ProzillaOS"
			>
				View source
			</Button>
		</div>
	</div>;
}