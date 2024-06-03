import { FC, memo } from "react";
import App from "../../../features/apps/app";
import styles from "./AppIcon.module.css";
import { ReactSVG } from "react-svg";
import { useSettingsManager } from "../../../hooks/settings/settingsManagerContext";
import { useContextMenu } from "../../../hooks/modals/contextMenu";
import { Actions } from "../../actions/Actions";
import { ClickAction } from "../../actions/actions/ClickAction";
import { faThumbTack, faTimes } from "@fortawesome/free-solid-svg-icons";
import { SettingsManager } from "../../../features/settings/settingsManager";
import { removeFromArray } from "../../../features/_utils/array.utils";
import AppsManager from "../../../features/apps/appsManager";
import WindowsManager from "../../../features/windows/windowsManager";

interface AppButtonProps {
	app: App;
	windowsManager: WindowsManager;
	pins: string[];
	active: boolean;
	visible: boolean;
}

export const AppButton: FC<AppButtonProps> = memo(({ app, windowsManager, pins, active, visible }: AppButtonProps) => {
	const isPinned = pins.includes(app.id);

	const settingsManager = useSettingsManager();
	const { onContextMenu } = useContextMenu({ Actions: (props) =>
		<Actions avoidTaskbar={false} {...props}>
			<ClickAction label={app.name} icon={AppsManager.getAppIconUrl(app.id)} onTrigger={() => {
				windowsManager.open(app.id);
			}}/>
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
			{active && <ClickAction label="Close window" icon={faTimes} onTrigger={() => {
				windowsManager.close(windowsManager.getAppWindowId(app.id));
			}}/>}
		</Actions>
	});

	const classNames = [styles["App-icon"]];
	if (active)
		classNames.push(styles.Active);
	if (!visible)
		classNames.push(styles.Hidden);

	if (!windowsManager)
		return;

	return (
		<button
			key={app.id}
			tabIndex={0}
			className={classNames.join(" ")}
			onClick={() => {
				const windowId =  windowsManager.getAppWindowId(app.id);

				if (!active) {
					windowsManager.open(app.id);
				} else if (!windowsManager.isFocused(windowId)) {
					windowsManager.focus(windowId);
				} else {
					windowsManager.setMinimized(windowId);
				}
			}}
			onContextMenu={(event) => {
				if (visible)
					onContextMenu(event);
			}}
			title={app.name}
		>
			<ReactSVG src={`/assets/apps/icons/${app.id}.svg`}/>
		</button>
	);
});