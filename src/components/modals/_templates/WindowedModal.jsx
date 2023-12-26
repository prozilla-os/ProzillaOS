import { useEffect, useRef, useState } from "react";
import { useScreenDimensions } from "../../../hooks/_utils/screen.js";
import Vector2 from "../../../features/math/vector2.js";
import styles from "./WindowedModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import { ReactSVG } from "react-svg";
import utilStyles from "../../../styles/utils.module.css";

export function WindowedModal({ modal, params, children, ...props }) {
	const { iconUrl, title } = params;

	const nodeRef = useRef(null);

	const [startPosition, setStartPosition] = useState(modal.position);
	const [screenWidth, screenHeight] = useScreenDimensions();

	useEffect(() => {
		if (screenWidth == null || screenHeight == null)
			return;

		if (modal.size.x > screenWidth || modal.size.y > screenHeight) {
			setStartPosition(new Vector2(0, 0));
		} else {
			if (modal.position.x > screenWidth) {
				modal.position.x = 0;
				setStartPosition(modal.position);
			}
			if (modal.position.y > screenHeight) {
				modal.position.y = 0;
				setStartPosition(modal.position);
			}
		}
	}, [modal, screenHeight, screenWidth]);

	return (<Draggable
		axis="both"
		handle={".Window-handle"}
		defaultPosition={startPosition}
		position={null}
		scale={1}
		bounds={{
			top: -modal.position.y - 1,
			bottom: screenHeight - 55 - modal.position.y,
			left: -modal.size.x + 85 - modal.position.x,
			right: screenWidth - 5 - modal.position.x
		}}
		cancel="button"
		nodeRef={nodeRef}
	>
		<div
			className={styles.Container}
			ref={nodeRef}
			style={{
				width: modal.size.x,
				height: modal.size.y,
			}}
		>
			<div className={`${styles.Header} Window-handle`}>
				<ReactSVG
					className={styles["Window-icon"]}
					src={iconUrl}
				/>
				<p className={utilStyles["Text-semibold"]}>{title}</p>
				<button aria-label="Close" className={`${styles["Header-button"]} ${styles["Exit-button"]}`} tabIndex={0}
					onClick={() => { modal.close(); }}>
					<FontAwesomeIcon icon={faXmark}/>
				</button>
			</div>
			<div className={styles["Window-content"]} {...props}>
				{children}
			</div>
		</div>
	</Draggable>);
}