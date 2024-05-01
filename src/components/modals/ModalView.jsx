import { memo } from "react";
import { Modal as ModalType } from "../../features/modals/modal.js";
import OutsideClickListener from "../../hooks/_utils/outsideClick.js";
import styles from "./ModalView.module.css";
import { useEffect } from "react";

/**
 * @typedef {object} modalProps
 * @param {object} props 
 * @param {ModalType} props.modal 
 * @param {*} props.params
 * @param {Function} props.onFinish
 */

/**
 * @param {object} root 
 * @param {ModalType} root.modal 
 */
export const ModalView = memo(({ modal }) => {
	useEffect(() => {
		const onDismiss = (event) => {
			if (event.key === "Escape")
				modal.close();
		};

		document.addEventListener("keydown", onDismiss);

		return () => {
			document.removeEventListener("keydown", onDismiss);
		};
	}, [modal]);

	const Container = () => (<div
		className={styles.Container}
		style={{ "--position-x": modal.position.x, "--position-y": modal.position.y }}
	>
		<modal.element modal={modal} {...modal.props}/>
	</div>);

	if (modal.dismissible) {
		return (<OutsideClickListener onOutsideClick={() => { modal.close(); }}>
			<Container/>
		</OutsideClickListener>);
	} else {
		return <Container/>;
	}
});