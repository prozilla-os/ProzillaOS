import styles from "../Settings.module.css";
import utilStyles from "../../../../styles/utils.module.css";
import { ProgressBar } from "../../../_utils/progress-bar/ProgressBar";
import { Button } from "../../../_utils/button/Button";
import { useVirtualRoot } from "../../../../hooks/virtual-drive/virtualRootContext";
import { StorageManager } from "../../../../features/storage/storageManager";
import { round } from "../../../../features/_utils/math.utils";

export function StorageTab() {
	const virtualRoot = useVirtualRoot();

	const maxBytes = StorageManager.MAX_BYTES;
	const usedBytes = StorageManager.getByteSize(virtualRoot?.toString() ?? "");

	const maxKB = StorageManager.byteToKilobyte(maxBytes);
	const usedKB = StorageManager.byteToKilobyte(usedBytes);
	const freeKB = maxKB - usedKB;

	return (<>
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
	</>);
}