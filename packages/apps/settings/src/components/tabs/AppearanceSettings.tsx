import { ChangeEventHandler, useEffect, useState } from "react";
import styles from "../Settings.module.css";
import { Button, SettingsManager, THEMES, useSettingsManager, useSystemManager, useVirtualRoot, useWindowedModal, utilStyles, IMAGE_EXTENSIONS, VirtualFile, VirtualFolder } from "@prozilla-os/core";
import { FileSelectorMode, fileExplorer } from "@prozilla-os/file-explorer";
import { WALLPAPERS_PATH } from "../../constants/settings.const";

export function AppearanceSettings() {
	const { modalsConfig } = useSystemManager();
	const virtualRoot = useVirtualRoot();
	const settingsManager = useSettingsManager();
	const [theme, setTheme] = useState(0);
	const [wallpaper, setWallpaper] = useState<string | null>(null);
	const desktopSettings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
	const themeSettings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.theme);
	const { openWindowedModal } = useWindowedModal();

	useEffect(() => {
		void desktopSettings?.get("wallpaper", setWallpaper);
		void themeSettings?.get("theme", (value: string) => { setTheme(parseInt(value)); });
	}, [desktopSettings, themeSettings]);

	const onWallpaperChange = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		void desktopSettings?.set("wallpaper", value);
	};

	const onThemeChange = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		void themeSettings?.set("theme", value);
	};

	return (<>
		<div className={styles.Option}>
			<p className={styles.Label}>Theme</p>
			<div className={styles.Input}>
				<select className={styles.Dropdown} aria-label="theme" value={theme} onChange={onThemeChange as unknown as ChangeEventHandler}>
					{Object.entries(THEMES).map(([key, value]) =>
						<option key={key} value={key}>{value}</option>
					)}
				</select>
			</div>
		</div>
		<div className={styles.Option}>
			<p className={styles.Label}>Wallpaper</p>
			<Button
				className={`${styles.Button} ${utilStyles.TextBold}`}
				onClick={() => {
					openWindowedModal({
						size: modalsConfig.defaultFileSelectorSize,
						Modal: (props: object) => <fileExplorer.WindowContent
							type={FileSelectorMode.Single}
							allowedFormats={IMAGE_EXTENSIONS}
							onFinish={(file: VirtualFile) => {
								if ((file).source != null)
									void desktopSettings?.set("wallpaper", file.source);
							}}
							{...props}
						/>
					});
				}}
			>
				Browse
			</Button>
			<div className={`${styles.Input} ${styles.ImageSelectContainer}`}>
				{(virtualRoot?.navigate(WALLPAPERS_PATH) as VirtualFolder)?.getFiles()?.map(({ id, source }) =>
					<label className={styles.ImageSelect} key={id}>
						<input
							type="radio"
							value={source ?? ""}
							aria-label="Wallpaper image"
							checked={source === wallpaper}
							onChange={onWallpaperChange as unknown as ChangeEventHandler}
							tabIndex={0}
						/>
						<img src={source ?? ""} alt={id} draggable="false"/>
					</label>
				)}
			</div>
		</div>
	</>);
}