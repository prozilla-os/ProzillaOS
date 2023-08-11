import { useState } from "react";
import { SettingsManager } from "../../features/settings/settings.js";
import { useSettings } from "../../hooks/settings/SettingsContext.js";
import styles from "./Desktop.module.css";
import { useEffect } from "react";
import { useModals } from "../../hooks/modals/ModalsContext.js";
import { ModalsView } from "../modals/ModalsView.jsx";
import Vector2 from "../../features/math/vector2.js";
import { ContextMenu } from "../modals/context-menu/ContextMenu.jsx";
import Modal from "../../features/modals/modal.js";

export function Desktop() {
	const settingsManager = useSettings();
	const [wallpaper, setWallpaper] = useState(null);
	const [modalsManager, modals] = useModals();

	useEffect(() => {
		(async () => {
			const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
			settings.get("wallpaper", setWallpaper);
		})();
	}, [settingsManager]);

	const onContextMenu = (event) => {
		event.preventDefault();
		modalsManager.open(new Modal(ContextMenu).setPosition(new Vector2(event.clientX, event.clientY)));
	};

	return (<>
		<div className={styles.Container} style={{ backgroundImage: `url(${wallpaper})` }} onContextMenu={onContextMenu}>
			<ModalsView modalsManager={modalsManager} modals={modals}/>
		</div>
	</>);
}