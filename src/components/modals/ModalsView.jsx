import { memo, useEffect, useRef } from "react";
import { Modal } from "../../features/modals/modal.js";
import ModalsManager from "../../features/modals/modalsManager.js";
import { ModalView } from "./ModalView.jsx";
import styles from "./ModalsView.module.css";

/**
 * @param {object} root 
 * @param {ModalsManager} root.modalsManager 
 * @param {Modal[]} root.modals 
 * @param {import("react").CSSProperties} root.style 
 * @param {import("react").className} root.className 
 */
export const ModalsView = memo(({ modalsManager, modals, style, className, ...props }) => {
	const ref = useRef(null);

	useEffect(() => {
		if (modalsManager)
			modalsManager.containerRef = ref;
	}, [modalsManager, ref]);

	return (
		<div ref={ref} style={style} className={`${styles.Container} ${className ?? ""}`} {...props}>
			{modals?.map((modal) =>
				<ModalView key={modal.id} modal={modal}/>
			)}
		</div>
	);
});