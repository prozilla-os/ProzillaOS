import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Settings.module.css";
import { faEllipsisVertical, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler } from "react";
import { Actions, App, ClickAction, ImagePreview, SettingsManager, useContextMenu, useSettingsManager, useWindowsManager } from "@prozilla-os/core";
import { removeFromArray } from "@prozilla-os/shared";

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
			<ClickAction label="Launch" icon={app.iconUrl as string | undefined} onTrigger={() => windowsManager?.open(app.id)}/>
			<ClickAction label={isPinned ? "Unpin from taskbar" : "Pin to taskbar"} icon={faThumbTack} onTrigger={() => {
				const newPins = [...pins];
				if (isPinned) {
					removeFromArray(app.id, pins);
				} else {
					newPins.push(app.id);
				}

				const settings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.taskbar);
				void settings?.set("pins", newPins.join(","));
			}}/>
		</Actions>
	});

	return <div className={`${styles.Option} ${styles.OptionHorizontal}`}>
		<span className={styles.Label}>
			<ImagePreview className={styles.Icon} source={app.iconUrl as string}/>
			{app.name}
		</span>
		<button className={styles.IconButton} onClick={onContextMenu as unknown as MouseEventHandler}>
			<FontAwesomeIcon icon={faEllipsisVertical}/>
		</button>
		{/* <div className={styles["Button-group"]}>
			<Button
				className={`${styles.Button} ${utilStyles.TextBold}`}
				onClick={() => windowsManager.open(id)}
			>
				Launch
			</Button>
			<Button
				className={`${styles.Button} ${styles["Button-red"]} ${utilStyles.TextBold}`}
			>
				Uninstall
			</Button>
			<Button
				className={`${styles.Button} ${utilStyles.TextBold}`}
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