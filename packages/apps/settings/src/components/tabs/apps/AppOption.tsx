import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../Settings.module.css";
import { faEllipsisVertical, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler } from "react";
import { Actions, App, ClickAction, ImagePreview, useContextMenu, useWindowsManager } from "@prozilla-os/core";
import { removeFromArray } from "@prozilla-os/shared";

interface AppOptionProps {
	app: App;
	pins: string[];
	setPins: (value: string[]) => void;
}

export function AppOption({ app, pins, setPins }: AppOptionProps) {
	const isPinned = pins.includes(app.id);

	const windowsManager = useWindowsManager();

	const { onContextMenu } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Launch" icon={app.iconUrl as string | undefined} onTrigger={() => windowsManager?.open(app.id)}/>
			<ClickAction label={isPinned ? "Unpin from taskbar" : "Pin to taskbar"} icon={faThumbTack} onTrigger={() => {
				const newPins = [...pins];
				if (isPinned) {
					removeFromArray(app.id, newPins);
				} else {
					newPins.push(app.id);
				}

				setPins(newPins);
			}}/>
		</Actions>,
	});

	return <div className={`${styles.Option} ${styles.OptionHorizontal} ${styles.OptionListItem}`}>
		<span className={styles.Label}>
			<ImagePreview className={styles.Icon} source={app.iconUrl as string}/>
			{app.name}
		</span>
		<button className={styles.IconButton} onClick={onContextMenu as unknown as MouseEventHandler}>
			<FontAwesomeIcon icon={faEllipsisVertical}/>
		</button>
	</div>;
}