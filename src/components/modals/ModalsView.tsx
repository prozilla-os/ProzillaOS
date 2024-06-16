import { memo, MutableRefObject, useEffect, useRef, useState } from "react";
import { ModalView } from "./ModalView";
import styles from "./ModalsView.module.css";
import { useModals } from "../../hooks/modals/modalsContext";
import { useModalsManager } from "../../hooks/modals/modalsManagerContext";
import { Modal } from "../../features/modals/modal";

export const ModalsView = memo(() => {
	const ref = useRef<HTMLDivElement>(null);
	const modals = useModals();
	const modalsManager = useModalsManager();
	const [sortedModals, setSortedModals] = useState<Modal[]>([]);

	// Sort modals
	useEffect(() => {
		if (modals != null)
			setSortedModals([...modals].sort((modalA, modalB) =>
				(modalA.lastInteraction ?? 0) - (modalB.lastInteraction ?? 0)
			));
	}, [modals]);

	useEffect(() => {
		if (modalsManager != null)
			modalsManager.containerRef = ref as MutableRefObject<HTMLDivElement>;
	}, [modalsManager, ref]);

	return <div ref={ref} className={styles.ModalsView}>
		{sortedModals?.map((modal) =>
			<ModalView key={modal.id} modal={modal}/>
		)}
	</div>;
});