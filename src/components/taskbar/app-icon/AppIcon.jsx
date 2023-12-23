import { memo } from "react";
import App from "../../../features/apps/app.js";
import styles from "./AppIcon.module.css";
import { ReactSVG } from "react-svg";
import { useSettingsManager } from "../../../hooks/settings/settingsManagerContext.js";
import { useContextMenu } from "../../../hooks/modals/contextMenu.js";
import ModalsManager from "../../../features/modals/modalsManager.js";
import { Actions } from "../../actions/Actions.jsx";
import { ClickAction } from "../../actions/actions/ClickAction.jsx";
import { faThumbTack, faTimes } from "@fortawesome/free-solid-svg-icons";
import { SettingsManager } from "../../../features/settings/settingsManager.js";
import { removeFromArray } from "../../../features/utils/array.utils.js";
import AppsManager from "../../../features/apps/appsManager.js";

/**
 * @param {object} props 
 * @param {App} props.app 
 * @param {ModalsManager} props.modalsManager 
 * @param {string[]} props.pins
 * @param {boolean} props.focused
 */
export const AppButton = memo(({ app, windowsManager, modalsManager, pins, active, visible }) => {
	const isPinned = pins.includes(app.id);

	const settingsManager = useSettingsManager();
	const { onContextMenu } = useContextMenu({ modalsManager, Actions: (props) =>
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
				settings.set("pins", newPins.join(","));
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
			<ReactSVG src={`${process.env.PUBLIC_URL}/assets/apps/icons/${app.id}.svg`}/>
		</button>
	);
});