import { useEffect, useRef, useState } from "react";
import styles from "./DialogBox.module.css";
import Draggable from "react-draggable";
import Vector2 from "../../../features/math/vector2.js";
import { ReactSVG } from "react-svg";
import utilStyles from "../../../styles/utils.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DIALOG_CONTENT_TYPES } from "../../../constants/modals.js";
import { useScreenDimensions } from "../../../hooks/utils/screen.js";

export function DialogBox({ modal, params }) {
	const { app, title, children } = params;

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

	const onClick = (event) => {
		event.preventDefault();
		const type = parseInt(event.target.getAttribute("data-type"));

		switch (type) {
			case DIALOG_CONTENT_TYPES.CloseButton:
				modal.close();
				break;
		}
	};

	return (<Draggable
		axis="both"
		handle={".Dialog-handle"}
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
			<div className={`${styles.Header} Dialog-handle`}>
				<ReactSVG
					className={styles["Dialog-icon"]}
					src={process.env.PUBLIC_URL + `/assets/applications/icons/${app.id}.svg`}
				/>
				<p className={utilStyles["Text-semibold"]}>{title}</p>
				<button aria-label="Close" className={`${styles["Header-button"]} ${styles["Exit-button"]}`} tabIndex={0} id="close-dialog"
					onClick={() => { modal.close(); }}>
					<FontAwesomeIcon icon={faXmark}/>
				</button>
			</div>
			<div className={styles["Dialog-content"]} onClick={onClick}>
				{children}
			</div>
		</div>
	</Draggable>);
}