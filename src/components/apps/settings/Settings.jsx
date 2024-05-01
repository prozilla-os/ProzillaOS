import styles from "./Settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHardDrive, faPalette, faShapes } from "@fortawesome/free-solid-svg-icons";
import utilStyles from "../../../styles/utils.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AppearanceSettings } from "./tabs/AppearanceSettings.jsx";
import { AboutSettings } from "./tabs/AboutSettings.jsx";
import { StorageTab } from "./tabs/StorageSettings.jsx";
import { AppsSettings } from "./tabs/AppsSettings.jsx";

/**
 * @param {import("../../windows/WindowView.jsx").windowProps} props 
 */
export function Settings({ tab, modalsManager }) {
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
				<AppsSettings modalsManager={modalsManager}/>
			</TabPanel>
			<TabPanel className={styles["Tab-panel"]}>
				<AppearanceSettings modalsManager={modalsManager}/>
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