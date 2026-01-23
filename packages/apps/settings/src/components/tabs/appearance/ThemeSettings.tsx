import styles from "../../Settings.module.css";
import { SettingsManager, useIntSetting } from "@prozilla-os/core";
import { Theme } from "@prozilla-os/skins";

export function ThemeSettings() {
	const [theme, setTheme] = useIntSetting(SettingsManager.VIRTUAL_PATHS.theme, "theme", Theme.Dark);

	return <div className={styles.Option}>
		<p className={styles.Label}>Theme</p>
		<div className={styles.Input}>
			<select className={styles.Dropdown} aria-label="theme" value={theme} onChange={(event) => setTheme(event.target.value)}>
				{Object.entries(Theme).filter(([_key, value]) => typeof value !== "number").map(([key, value]) =>
					<option key={key} value={key}>{value}</option>
				)}
			</select>
		</div>
	</div>;
}