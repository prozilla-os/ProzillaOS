import { CSSProperties, FC, memo, ReactNode } from "react";
import Modal from "../../features/modals/modal";
import OutsideClickListener from "../../hooks/_utils/outsideClick";
import styles from "./ModalView.module.css";
import { useEffect } from "react";

export interface ModalProps {
	modal: Modal;
	params?: Record<string, any>;
	children?: ReactNode;
	onFinish?: Function;
	[key: string]: any;
}

export const ModalView: FC<ModalProps> = memo(({ modal }) => {
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
		style={{ "--position-x": modal.position.x, "--position-y": modal.position.y } as CSSProperties}
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