import { memo } from "react";
import Application from "../../../features/applications/application.js";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext.js";
import styles from "./AppIcon.module.css";
import { ReactSVG } from "react-svg";
import { useSettingsManager } from "../../../hooks/settings/settingsManagerContext.js";
import { useContextMenu } from "../../../hooks/modals/contextMenu.js";
import ModalsManager from "../../../features/modals/modals.js";
import { Actions } from "../../actions/Actions.jsx";
import { ClickAction } from "../../actions/actions/ClickAction.jsx";
import { faThumbTack, faTimes } from "@fortawesome/free-solid-svg-icons";
import { SettingsManager } from "../../../features/settings/settingsManager.js";
import { removeFromArray } from "../../../features/utils/array.js";

/**
 * @param {object} props 
 * @param {Application} props.app 
 * @param {ModalsManager} props.modalsManager 
 * @param {string[]} props.pins
 */
export const AppButton = memo(({ app, modalsManager, pins, active, visible }) => {
	const isPinned = pins.includes(app.id);

	const windowsManager = useWindowsManager();
	const settingsManager = useSettingsManager();
	const { onContextMenu } = useContextMenu({ modalsManager, Actions: (props) =>
		<Actions avoidTaskbar={false} {...props}>
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

	return (
		<button
			key={app.id}
			tabIndex={0}
			className={classNames.join(" ")}
			onClick={() => { windowsManager.open(app.id); }}
			onContextMenu={(event) => {
				if (visible)
					onContextMenu(event);
			}}
			title={app.name}
		>
			<ReactSVG src={`${process.env.PUBLIC_URL}/media/applications/icons/${app.id}.svg`}/>
		</button>
	);
});