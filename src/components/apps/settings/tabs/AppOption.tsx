import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppsManager from "../../../../features/apps/appsManager";
import { ImagePreview } from "../../file-explorer/directory-list/ImagePreview";
import styles from "../Settings.module.css";
import { faEllipsisVertical, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useWindowsManager } from "../../../../hooks/windows/windowsManagerContext";
import { useContextMenu } from "../../../../hooks/modals/contextMenu";
import { Actions } from "../../../actions/Actions";
import { ClickAction } from "../../../actions/actions/ClickAction";
import { removeFromArray } from "../../../../features/_utils/array.utils";
import { useSettingsManager } from "../../../../hooks/settings/settingsManagerContext";
import { SettingsManager } from "../../../../features/settings/settingsManager";
import App from "../../../../features/apps/app";

interface AppOptionProps {
	app: App;
	pins: string[];
	setPins: Function;
}

export function AppOption({ app, pins, setPins: _setPins }: AppOptionProps) {
	const isPinned = pins.includes(app.id);

	const settingsManager = useSettingsManager();
	const windowsManager = useWindowsManager();

	const { onContextMenu } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Launch" icon={AppsManager.getAppIconUrl(app.id)} onTrigger={() => windowsManager.open(app.id)}/>
			<ClickAction label={isPinned ? "Unpin from taskbar" : "Pin to taskbar"} icon={faThumbTack} onTrigger={() => {
				const newPins = [...pins];
				if (isPinned) {
					removeFromArray(app.id, pins);
				} else {
					newPins.push(app.id);
				}

				const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.taskbar);
				void settings.set("pins", newPins.join(","));
			}}/>
		</Actions>
	});

	return <div className={`${styles["Option"]} ${styles["Option-horizontal"]}`}>
		<span className={styles["Label"]}>
			<ImagePreview className={styles["Icon"]} source={AppsManager.getAppIconUrl(app.id)}/>
			{app.name}
		</span>
		<button className={styles["Icon-button"]} onClick={onContextMenu}>
			<FontAwesomeIcon icon={faEllipsisVertical}/>
		</button>
		{/* <div className={styles["Button-group"]}>
			<Button
				className={`${styles.Button} ${utilStyles["Text-bold"]}`}
				onClick={() => windowsManager.open(id)}
			>
				Launch
			</Button>
			<Button
				className={`${styles.Button} ${styles["Button-red"]} ${utilStyles["Text-bold"]}`}
			>
				Uninstall
			</Button>
			<Button
				className={`${styles.Button} ${utilStyles["Text-bold"]}`}
				onClick={() => {
					const newPins = [...pins];
					if (isPinned) {
						removeFromArray(id, pins);
					} else {
						newPins.push(id);
					}

					const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.taskbar);
					settings.set("pins", newPins.join(","));
				}}
			>
				{isPinned ? "Unpin from taskbar" : "Pin to taskbar"}
			</Button>
		</div> */}
	</div>;
}