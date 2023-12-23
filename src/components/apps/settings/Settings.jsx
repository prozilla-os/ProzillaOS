import styles from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHardDrive, faPalette } from "@fortawesome/free-solid-svg-icons";
import utilStyles from "../../../styles/utils.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AppearanceSettings } from "./AppearanceSettings.jsx";
import { AboutSettings } from "./AboutSettings.jsx";
import { StorageTab } from "./StorageSettings.jsx";

/**
 * @param {import("../../windows/WindowView.jsx").windowProps} props 
 */
export function Settings({ initialTabIndex }) {
	return (
		<Tabs
			defaultIndex={initialTabIndex ?? 0}
			className={styles.Container}
			selectedTabClassName={styles["Active-tab"]}
			selectedTabPanelClassName={styles["Active-panel"]}
		>
			<TabList className={styles.Tabs}>
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