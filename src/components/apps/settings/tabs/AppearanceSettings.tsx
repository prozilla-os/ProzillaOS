import { ChangeEventHandler, useEffect, useState } from "react";
import { SettingsManager } from "../../../../features/settings/settingsManager";
import styles from "../Settings.module.css";
import utilStyles from "../../../../styles/utils.module.css";
import { useVirtualRoot } from "../../../../hooks/virtual-drive/virtualRootContext";
import { useSettingsManager } from "../../../../hooks/settings/settingsManagerContext";
import { WALLPAPERS_PATH } from "../../../../config/apps/settings.config";
import { useWindowedModal } from "../../../../hooks/modals/windowedModal";
import { Button } from "../../../_utils/button/Button";
import { FileSelector } from "../../../modals/file-selector/FileSelector";
import { SELECTOR_MODE } from "../../../../config/apps/fileExplorer.config";
import { DEFAULT_FILE_SELECTOR_SIZE } from "../../../../config/modals.config";
import { IMAGE_FORMATS } from "../../../../config/apps/mediaViewer.config";
import { VirtualFile } from "../../../../features/virtual-drive/file/virtualFile";
import { VirtualFolder } from "../../../../features/virtual-drive/folder/virtualFolder";

export function AppearanceSettings() {
	const virtualRoot = useVirtualRoot();
	const settingsManager = useSettingsManager();
	const [wallpaper, setWallpaper] = useState<string>(null);
	const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
	const { openWindowedModal } = useWindowedModal();

	useEffect(() => {
		void settings.get("wallpaper", setWallpaper);
	}, [settings]);

	const onChange = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		void settings.set("wallpaper", value);
	};

	return (<>
		<div className={styles["Option"]}>
			<p className={styles["Label"]}>Wallpaper</p>
			<Button
				className={`${styles.Button} ${utilStyles["Text-bold"]}`}
				onClick={() => {
					openWindowedModal({
						size: DEFAULT_FILE_SELECTOR_SIZE,
						Modal: (props) => <FileSelector
							type={SELECTOR_MODE.SINGLE}
							allowedFormats={IMAGE_FORMATS}
							onFinish={(file: VirtualFile) => {
								void settings.set("wallpaper", file.source);
							}}
							{...props}
						/>
					});
				}}
			>
				Browse
			</Button>
			<div className={styles["Input"]}>
				{(virtualRoot.navigate(WALLPAPERS_PATH) as VirtualFolder)?.getFiles()?.reverse().map(({ id, source }) =>
					<label className={styles["Image-select"]} key={id}>
						<input
							type="radio"
							value={source}
							aria-label="Wallpaper image"
							checked={source === wallpaper}
							onChange={onChange as unknown as ChangeEventHandler}
							tabIndex={0}
						/>
						<img src={source} alt={id} draggable="false"/>
					</label>
				)}
			</div>
		</div>
	</>);
}