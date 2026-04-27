import { ModalsView, ProzillaOS, terminal } from "prozilla-os";
import { appsConfig } from "../config/apps.config";
import styles from "./App.module.css";

export function App() {
	return (
		<ProzillaOS
			systemName="Terminal"
			tagLine="ProzillaOS examples"
			config={{
				apps: appsConfig,
			}}
		>
			<div className={styles.StandaloneView}>
				<ModalsView/>
				<div className={styles.StandaloneWindow}>
					<terminal.WindowContent
						app={terminal}
						active={true}
						standalone={true}
					/>
				</div>
			</div>
		</ProzillaOS>
	);
}
