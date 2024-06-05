import { memo, useEffect, useRef, useState } from "react";
import { ModalView } from "./ModalView";
import styles from "./ModalsView.module.css";
import { useModals } from "../../hooks/modals/modalsContext";
import { useModalsManager } from "../../hooks/modals/modalsManagerContext";
import Modal from "../../features/modals/modal";

export const ModalsView = memo(() => {
	const ref = useRef(null);
	const modals = useModals();
	const modalsManager = useModalsManager();
	const [sortedModals, setSortedModals] = useState<Modal[]>([]);

	// Sort modals
	useEffect(() => {
		setSortedModals([...modals].sort((modalA, modalB) =>
			modalA.lastInteraction - modalB.lastInteraction
		));
	}, [modals]);

	useEffect(() => {
		if (modalsManager)
			modalsManager.containerRef = ref;
	}, [modalsManager, ref]);

	return <div ref={ref} className={styles.ModalsView}>
		{sortedModals?.map((modal) =>
			<ModalView key={modal.id} modal={modal}/>
		)}
	</div>;
});