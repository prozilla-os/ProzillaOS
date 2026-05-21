import { useSystemManager, APP_CATEGORIES } from "@prozilla-os/core";
import styles from "./AppCenter.module.css";
import { BrowseView } from "./BrowseView";
import { InstallView } from "./InstallView";
import { useState, useEffect } from "react";

export type CategoryType = typeof APP_CATEGORIES[number] | "All";
type Tab = "browse" | "install";

export function AppCenter() {
	const { appsConfig } = useSystemManager();
	const [searchQuery, setSearchQuery] = useState("");
	const [category, setCategory] = useState<CategoryType>("All");
	const [tab, setTab] = useState<Tab>("browse");
	const [apps, setApps] = useState([...appsConfig.apps]);

	useEffect(() => {
		return appsConfig.onAppsChange(() => setApps([...appsConfig.apps]));
	}, [appsConfig]);

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
				apps={apps}
			/>
			: <InstallView/>
		}
	</div>;
}