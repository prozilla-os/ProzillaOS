import { FC, memo, MouseEvent } from "react";
import { App } from "../../../features/";
import styles from "./AppIcon.module.css";
import { ReactSVG } from "react-svg";
import { useSettingsManager } from "../../../hooks/settings/settingsManagerContext";
import { useContextMenu } from "../../../hooks/modals/contextMenu";
import { Actions } from "../../actions/Actions";
import { ClickAction } from "../../actions/actions/ClickAction";
import { WindowsManager } from "../../../features/windows/windowsManager";
import { useClassNames } from "../../../hooks";
import { VectorImage } from "../../_utils/vector-image/VectorImage";

interface AppButtonProps {
	app: App;
	windowsManager?: WindowsManager;
	active: boolean;
	visible: boolean;
}

export const AppButton: FC<AppButtonProps> = memo(({ app, windowsManager, active, visible }: AppButtonProps) => {
	const settingsManager = useSettingsManager();
	const { onContextMenu } = useContextMenu({ Actions: (props) =>
		<Actions avoidTaskbar={false} {...props}>
			<ClickAction label={app.name} icon={app.iconUrl as string | undefined} onTrigger={() => {
				windowsManager?.open(app.id);
			}}/>
			{/* <ClickAction label={isPinned ? "Unpin from taskbar" : "Pin to taskbar"} icon={faThumbTack} onTrigger={() => {
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
			}}/>} */}
		</Actions>
	});

	const classNames = [styles["App-icon"]];
	if (active)
		classNames.push(styles.Active);
	if (!visible)
		classNames.push(styles.Hidden);

	const className = useClassNames(classNames, "Taskbar", "AppIcon");

	if (!windowsManager)
		return;

	return (
		<button
			key={app.id}
			tabIndex={0}
			className={className}
			onClick={() => {
				const windowId =  windowsManager.getAppWindowId(app.id);

				if (!active || windowId == null) {
					windowsManager.open(app.id);
				} else if (!windowsManager.isFocused(windowId)) {
					windowsManager.focus(windowId);
				} else {
					windowsManager.setMinimized(windowId);
				}
			}}
			onContextMenu={(event) => {
				if (visible)
					onContextMenu(event as unknown as MouseEvent<HTMLElement, MouseEvent>);
			}}
			title={app.name}
		>
			<VectorImage src={app.iconUrl as string}/>
		</button>
	);
});