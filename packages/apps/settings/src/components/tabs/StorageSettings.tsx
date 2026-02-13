import { round } from "@prozilla-os/shared";
import styles from "../Settings.module.css";
import { Button, ProgressBar, Storage, useVirtualRoot, utilStyles, VirtualDriveStorage } from "@prozilla-os/core";

export function StorageTab() {
	const virtualRoot = useVirtualRoot();

	if (!virtualRoot) {
		return <div className={styles.Option}>
			<p className={styles.Label}>Virtual Drive is unavailable.</p>
		</div>;
	}

	const storage = virtualRoot.storage;

	const maxBytes = Storage.MAX_BYTES;
	const usedBytes = storage.getItemByteSize(VirtualDriveStorage.KEY, virtualRoot?.toString() ?? "");

	const maxKB = Storage.byteToKilobyte(maxBytes);
	const usedKB = Storage.byteToKilobyte(usedBytes);
	const freeKB = maxKB - usedKB;

	return <>
		<div className={`${styles.Option} ${styles.ProgressBarContainer}`}>
			<p className={styles.Label}>Virtual Drive ({round(maxKB, 1)} KB)</p>
			<ProgressBar fillPercentage={usedKB / maxKB * 100} className={styles.ProgressBar}/>
			<span className={styles.ProgressBarLabels}>
				<p className={utilStyles.TextLight}>{round(usedKB, 1)} KB used</p>
				<p className={utilStyles.TextLight}>{round(freeKB, 1)} KB free</p>
			</span>
		</div>
		<div className={styles.Option}>
			<p className={styles.Label}>Manage data</p>
			<Button
				className={`${styles.Button} ${styles.ButtonDanger} ${utilStyles.TextBold}`}
				onClick={() => { virtualRoot?.reset(); }}
			>
				Reset
			</Button>
		</div>
	</>;
}