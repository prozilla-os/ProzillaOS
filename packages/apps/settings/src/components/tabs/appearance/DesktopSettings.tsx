import styles from "../../Settings.module.css";
import { SettingsManager, useBoolSetting } from "@prozilla-os/core";
import { Checkbox } from "../../Checkbox";

export function DesktopSettings() {
	const [showIcons, setShowIcons] = useBoolSetting(SettingsManager.VIRTUAL_PATHS.desktop, "show-icons", true);

	return <div className={styles.Option}>
		<p className={styles.Label}>Show icons</p>
		<div className={styles.Input}>
			<Checkbox active={showIcons} setActive={setShowIcons}/>
		</div>
	</div>;
}