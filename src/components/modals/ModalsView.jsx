import { Modal } from "../../features/modals/modal.js";
import ModalsManager from "../../features/modals/modals.js";
import { ModalView } from "./ModalView.jsx";

/**
 * @param {object} root 
 * @param {ModalsManager} root.modalsManager 
 * @param {Modal[]} root.modals 
 */
export function ModalsView({ modalsManager, modals }) {
	return (
		<div>
			{modals?.map((modal) =>
				<ModalView key={modal.id} modal={modal}/>
			)}
		</div>
	);
}