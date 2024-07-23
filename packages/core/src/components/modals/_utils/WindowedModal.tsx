import { useEffect, useRef, useState } from "react";
import { useScreenDimensions } from "../../../hooks/_utils/screen";
import { Vector2 } from "../../../features/math/vector2";
import styles from "./WindowedModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import { ReactSVG } from "react-svg";
import utilStyles from "../../../styles/utils.module.css";
import { ModalProps } from "../ModalView";
import { VectorImage } from "../../_utils/vector-image/VectorImage";

export function WindowedModal({ modal, params, children, ...props }: ModalProps) {
	const nodeRef = useRef(null);

	const [startPosition, setStartPosition] = useState(modal?.position);
	const [screenWidth, screenHeight] = useScreenDimensions();

	useEffect(() => {
		if (screenWidth == null || screenHeight == null) return;

		
		if (modal?.position != null) {
			if (modal.position.x > screenWidth) modal.position.x = 0;
			if (modal.position.y > screenHeight) modal.position.y = 0;

			setStartPosition(modal.position);
		} else {
			setStartPosition(new Vector2(0, 0));
		}
	}, [modal, screenHeight, screenWidth]);

	return <Draggable
		axis="both"
		handle={".Window-handle"}
		defaultPosition={startPosition}
		position={undefined}
		scale={1}
		bounds={{
			top: -(modal?.position.y ?? 0) - 1,
			bottom: (screenHeight ?? 0) - 55 - (modal?.position.y ?? 0),
			left: -(modal?.size.x ?? 0) + 85 - (modal?.position.x ?? 0),
			right: (screenWidth ?? 0) - 5 - (modal?.position.x ?? 0)
		}}
		cancel="button"
		nodeRef={nodeRef}
	>
		<div
			className={styles.WindowedModal}
			ref={nodeRef}
			style={{
				width: modal?.size.x ?? 0,
				height: modal?.size.y ?? 0,
			}}
		>
			<div className={`${styles.Header} Window-handle`}>
				<VectorImage
					className={styles["Window-icon"]}
					src={params?.iconUrl as string}
				/>
				<p className={utilStyles.TextSemibold}>{params?.title as string}</p>
				<button aria-label="Close" className={`${styles["Header-button"]} ${styles["Exit-button"]}`} tabIndex={0}
					onClick={() => { modal?.close(); }}>
					<FontAwesomeIcon icon={faXmark}/>
				</button>
			</div>
			<div className={styles["Window-content"]} {...props}>
				{children}
			</div>
		</div>
	</Draggable>;
}