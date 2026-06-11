import { useEffect, useRef, useState, type FC } from "react";
import styles from "./TaskbarApps.module.css";
import { App, Settings } from "../../../features";
import { TaskbarAppButton } from "./TaskbarAppButton";
import { useClassNames, useInstalledApps, useScrollWithShadow, useSettingsManager } from "../../../hooks";
import { useWindows } from "../../../hooks/windows/windowsContext";

export interface TaskbarAppsProps {
	renderApp?: FC<{ app: App, active: boolean, visible: boolean }>;
}

export function TaskbarApps({ renderApp: AppButton = TaskbarAppButton }: TaskbarAppsProps) {
	const [apps, setApps] = useState<App[]>([]);
	const settingsManager = useSettingsManager();
	const windows = useWindows();
	const installedApps = useInstalledApps({ sort: false });
	const ref = useRef<HTMLDivElement>(null);
	const { boxShadow, onUpdate } = useScrollWithShadow({ ref, shadow: {
		offset: 20,
		blurRadius: 10,
		spreadRadius: -10,
		color: { a: 25 },
	} });

	useEffect(() => {
		const settings = settingsManager?.getSettings(Settings.TASKBAR);
		void settings?.get("pins", (pinList: string) => {
			const pins = pinList.split(",");

			const newApps = [...installedApps].sort((appA, appB) => {
				const indexA = pins.indexOf(appA.id);
				const indexB = pins.indexOf(appB.id);
				if (indexA < 0 && indexB > 0) {
					return 1;
				} else if (indexA > 0 && indexB < 0) {
					return -1;
				} else if (indexA < 0 && indexB < 0) {
					return 0;
				} else {
					return indexA - indexB;
				}
			}).map((app) => {
				app.isPinned = pins.includes(app.id);
				return app;
			});
			setApps(newApps);
		});
	}, [installedApps, settingsManager]);
	
	return <div className={useClassNames([styles.AppIconsContainer], "Taskbar", "AppIcons")} data-allow-context-menu={true} style={{ boxShadow }}>
		<div
			className={styles.AppIcons}
			data-allow-context-menu={true}
			onScroll={onUpdate}
			ref={ref}
		>
			{apps.map((app) => {
				if (windows == null) return;

				const isActive = windows.some((window) => window.app?.id === app.id);
				const shouldBeShown = app.isPinned || isActive;
				return <AppButton
					key={app.id}
					app={app}
					active={isActive}
					visible={shouldBeShown}
				/>;
			})}
		</div>
	</div>;
}