import { Image } from "@prozilla-os/core";
import { type RegistryEntrySnapshot } from "../../core/appRegistry";
import styles from "./AppCard.module.css";

interface AppCardProps {
	entry: RegistryEntrySnapshot;
	onOpen: () => void;
	onInstall: () => void;
	onUninstall: () => void;
}

export function AppCard({ entry, onOpen, onInstall, onUninstall }: AppCardProps) {
	const { name, iconUrl, description, category, isInstalled } = entry;

	return <div className={styles.AppCard} onClick={onOpen}>
		<div className={styles.AppIcon}>
			{iconUrl && <Image src={iconUrl}/>}
		</div>
		<div className={styles.AppInfo}>
			<p className={styles.AppName}>{name}</p>
			<p className={styles.AppDescription}>
				{description ?? "No description available."}
			</p>
			{category != null && <p className={styles.AppCategory}>{category}</p>}
		</div>
		<div className={styles.AppActions} onClick={(event) => { event.stopPropagation(); }}>
			{isInstalled
				? <button
					className={`${styles.InstallButton} ${styles.Installed}`}
					onClick={onUninstall}
				>
					Uninstall
				</button>
				: <button
					className={`${styles.InstallButton} ${styles.NotInstalled}`}
					onClick={onInstall}
				>
					Install
				</button>
			}
		</div>
	</div>;
}
