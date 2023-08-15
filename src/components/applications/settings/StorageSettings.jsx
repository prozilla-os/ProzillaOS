import styles from "./Settings.module.css";
import utilStyles from "../../../styles/utils.module.css";
import { round } from "../../../features/math/round.js";
import { ProgressBar } from "../../utils/ProgressBar.jsx";
import { Button } from "../../utils/Button.jsx";
import { useVirtualRoot } from "../../../hooks/virtual-drive/virtualRootContext.js";
import { StorageManager } from "../../../features/storage/storageManager.js";

export function StorageTab() {
	const virtualRoot = useVirtualRoot();

	const maxBytes = StorageManager.MAX_BYTES;
	const usedBytes = StorageManager.getByteSize(virtualRoot.toString());

	const maxKB = StorageManager.byteToKilobyte(maxBytes);
	const usedKB = StorageManager.byteToKilobyte(usedBytes);
	const freeKB = maxKB - usedKB;

	return (<>
		<div className={`${styles["Option"]} ${styles["Progress-bar-container"]}`}>
			<p className={styles["Label"]}>Virtual Drive ({round(maxKB, 1)} KB)</p>
			<ProgressBar fillPercentage={usedKB / maxKB * 100} className={styles["Progress-bar"]}/>
			<span className={styles["Progress-bar-labels"]}>
				<p className={utilStyles["Text-light"]}>{round(usedKB, 1)} KB used</p>
				<p className={utilStyles["Text-light"]}>{round(freeKB, 1)} KB free</p>
			</span>
		</div>
		<div className={styles["Option"]}>
			<p className={styles["Label"]}>Manage data</p>
			<Button
				className={`${styles.Button} ${styles["Button-red"]} ${utilStyles["Text-bold"]}`}
				onClick={() => { virtualRoot.reset?.(); }}
			>
				Reset
			</Button>
		</div>
	</>);
}