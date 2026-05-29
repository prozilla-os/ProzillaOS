import { useSystemManager, APP_CATEGORIES, useSingleton, useWindowsManager, WindowProps } from "@prozilla-os/core";
import styles from "./AppCenter.module.css";
import { BrowseView } from "./browse/BrowseView";
import { InstallView } from "./install/InstallView";
import { AppRegistry } from "../core/appRegistry";
import { useSnapshot } from "valtio";
import { useState } from "react";

export type CategoryType = typeof APP_CATEGORIES[number] | "All";
export type AppCenterTab = "browse" | "install";

export interface AppCenterProps extends WindowProps {
	tab?: AppCenterTab;
}

export function AppCenter({ tab: initialTab = "browse" }: AppCenterProps) {
	const systemManager = useSystemManager();
	const windowsManager = useWindowsManager();
	const [tab, setTab] = useState<AppCenterTab>(initialTab);
	const [searchQuery, setSearchQuery] = useState("");
	const [category, setCategory] = useState<CategoryType>("All");
	const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
	const registry = useSingleton(() => new AppRegistry(systemManager));
	const state = useSnapshot(registry.state);
	const selectedEntry = selectedEntryId != null
		? state.entries.find(({ id }) => id === selectedEntryId) ?? null
		: null;

	return <div className={styles.AppCenter}>
		<div className={styles.Tabs}>
			<button
				className={`${styles.Tab} ${tab === "browse" ? styles.Active : ""}`}
				onClick={() => setTab("browse")}
			>
				Browse
			</button>
			<button
				className={`${styles.Tab} ${tab === "install" ? styles.Active : ""}`}
				onClick={() => setTab("install")}
			>
				Install
			</button>
		</div>
		{tab === "browse"
			? <BrowseView
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				category={category}
				setCategory={setCategory}
				entries={state.entries}
				selectedEntry={selectedEntry}
				onSelectEntry={(entry) => setSelectedEntryId(entry?.id ?? null)}
				onInstall={(entry) => void registry.installApp(entry.id)}
				onUninstall={(entry) => {
					windowsManager?.closeAppWindows(entry.id);
					registry.uninstallApp(entry.id);
				}}
			/>
			: <InstallView registry={registry}/>
		}
	</div>;
}
