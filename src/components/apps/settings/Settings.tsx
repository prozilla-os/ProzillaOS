import styles from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHardDrive, faPalette, faShapes } from "@fortawesome/free-solid-svg-icons";
import utilStyles from "../../../styles/utils.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AppearanceSettings } from "./tabs/AppearanceSettings";
import { AboutSettings } from "./tabs/AboutSettings";
import { StorageTab } from "./tabs/StorageSettings";
import { AppsSettings } from "./tabs/AppsSettings";
import { WindowProps } from "../../windows/WindowView";

interface SettingsProps extends WindowProps {
	tab?: number;
}

export function Settings({ tab }: SettingsProps) {
	return (
		<Tabs
			defaultIndex={tab ?? 0}
			className={styles.Container}
			selectedTabClassName={styles["Active-tab"]}
			selectedTabPanelClassName={styles["Active-panel"]}
		>
			<TabList className={styles.Tabs}>
				<Tab className={styles["Tab-button"]} tabIndex="0">
					<FontAwesomeIcon icon={faShapes}/>
					<p className={utilStyles["Text-semibold"]}>Apps</p>
				</Tab>
				<Tab className={styles["Tab-button"]} tabIndex="0">
					<FontAwesomeIcon icon={faPalette}/>
					<p className={utilStyles["Text-semibold"]}>Appearance</p>
				</Tab>
				<Tab className={styles["Tab-button"]} tabIndex="0">
					<FontAwesomeIcon icon={faHardDrive}/>
					<p className={utilStyles["Text-semibold"]}>Storage</p>
				</Tab>
				<Tab className={styles["Tab-button"]} tabIndex="0">
					<FontAwesomeIcon icon={faCircleInfo}/>
					<p className={utilStyles["Text-semibold"]}>About</p>
				</Tab>
			</TabList>
			<TabPanel className={styles["Tab-panel"]}>
				<AppsSettings/>
			</TabPanel>
			<TabPanel className={styles["Tab-panel"]}>
				<AppearanceSettings/>
			</TabPanel>
			<TabPanel className={styles["Tab-panel"]}>
				<StorageTab/>
			</TabPanel>
			<TabPanel className={styles["Tab-panel"]}>
				<AboutSettings/>
			</TabPanel>
		</Tabs>
	);
}