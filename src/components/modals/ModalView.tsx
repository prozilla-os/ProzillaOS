import { CSSProperties, FC, KeyboardEvent, memo, ReactNode } from "react";
import Modal from "../../features/modals/modal";
import OutsideClickListener from "../../hooks/_utils/outsideClick";
import styles from "./ModalView.module.css";
import { useEffect } from "react";

export interface ModalProps {
	modal?: Modal;
	params?: {
		appId?: string;
		fullscreen?: boolean;
		iconUrl?: string;
		title?: string;
		standalone?: boolean;
		[key: string]: unknown;
	};
	children?: ReactNode;
	onFinish?: Function;
	[key: string]: unknown;
}

export const ModalView: FC<ModalProps> = memo(({ modal }) => {
	useEffect(() => {
		const onDismiss = (event: Event) => {
			if ((event as unknown as KeyboardEvent).key === "Escape")
				modal.close();
		};

		document.addEventListener("keydown", onDismiss);

		return () => {
			document.removeEventListener("keydown", onDismiss);
		};
	}, [modal]);

	const Container = () => (<div
		className={styles.ModalView}
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