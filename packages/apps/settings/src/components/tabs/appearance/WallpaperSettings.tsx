import { Button, IMAGE_EXTENSIONS, SettingsManager, useStringSetting, useSystemManager, useVirtualRoot, useWindowedModal, utilStyles, VirtualFile, VirtualFolder } from "@prozilla-os/core";
import styles from "../../Settings.module.css";
import { FileSelectorMode, fileExplorer } from "@prozilla-os/file-explorer";
import { WALLPAPERS_PATH } from "../../../constants/settings.const";

export function WallpaperSettings() {
	const { modalsConfig } = useSystemManager();
	const virtualRoot = useVirtualRoot();
	const [wallpaper, setWallpaper] = useStringSetting(SettingsManager.VIRTUAL_PATHS.desktop, "wallpaper");
	const { openWindowedModal } = useWindowedModal();

	return <div className={styles.Option}>
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
							if (file.source != null)
								setWallpaper(file.source);
						}}
						{...props}
					/>,
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
						onChange={(event) => setWallpaper(event.target.value)}
						tabIndex={0}
					/>
					<img src={source ?? ""} alt={id} draggable="false"/>
				</label>
			)}
		</div>
	</div>;
}