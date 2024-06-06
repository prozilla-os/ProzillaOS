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
	return <div className={styles.SettingsContainer}>
		<Tabs
			defaultIndex={tab ?? 0}
			className={styles.Settings}
			selectedTabClassName={styles.ActiveTab}
			selectedTabPanelClassName={styles.ActivePanel}
		>
			<TabList className={styles.Tabs}>
				<Tab className={styles.TabButton} tabIndex="0">
					<FontAwesomeIcon icon={faShapes}/>
					<p className={utilStyles.TextSemibold}>Apps</p>
				</Tab>
				<Tab className={styles.TabButton} tabIndex="0">
					<FontAwesomeIcon icon={faPalette}/>
					<p className={utilStyles.TextSemibold}>Appearance</p>
				</Tab>
				<Tab className={styles.TabButton} tabIndex="0">
					<FontAwesomeIcon icon={faHardDrive}/>
					<p className={utilStyles.TextSemibold}>Storage</p>
				</Tab>
				<Tab className={styles.TabButton} tabIndex="0">
					<FontAwesomeIcon icon={faCircleInfo}/>
					<p className={utilStyles.TextSemibold}>About</p>
				</Tab>
			</TabList>
			<TabPanel className={styles.TabPanel}>
				<AppsSettings/>
			</TabPanel>
			<TabPanel className={styles.TabPanel}>
				<AppearanceSettings/>
			</TabPanel>
			<TabPanel className={styles.TabPanel}>
				<StorageTab/>
			</TabPanel>
			<TabPanel className={styles.TabPanel}>
				<AboutSettings/>
			</TabPanel>
		</Tabs>
	</div>;
}