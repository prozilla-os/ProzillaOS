import { Modal as ModalType } from "../../features/modals/modal.js";
import OutsideClickListener from "../../hooks/utils/outsideClick.js";
import styles from "./ModalView.module.css";

/**
 * @param {object} root 
 * @param {ModalType} root.modal 
 */
export function ModalView({ modal }) {
	return (
		<OutsideClickListener onOutsideClick={() => { modal.close(); }}>
			<div className={styles.Container} style={{ "--position-x": modal.position.x, "--position-y": modal.position.y }}>
				<modal.element modal={modal} {...modal.props}/>
			</div>
		</OutsideClickListener>
	);
}