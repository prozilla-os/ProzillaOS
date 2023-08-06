import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Window.module.css";
import { faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { ReactSVG } from "react-svg";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";
import Draggable from "react-draggable";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import Application from "../../features/applications/application.js";
// eslint-disable-next-line no-unused-vars
import Vector2 from "../../features/math/vector2.js";

/**
 * @param {object} props
 * @param {string} props.id 
 * @param {Application} props.app 
 * @param {Vector2} props.size 
 * @param {Vector2} props.position 
 * @param {boolean} props.focused 
 * @param {Function} props.onInteract
 * @param {object} props.options
 */
export function Window({ id, app, size, position, focused = false, onInteract, options }) {
	const windowsManager = useWindowsManager();
	const nodeRef = useRef(null);

	const [maximized, setMaximized] = useState(false);
	const [minimized, setMinimized] = useState(false);

	const [screenWidth, setScreenWidth] = useState(100);
	const [screenHeight, setScreenHeight] = useState(100);

	const [title, setTitle] = useState(app.name);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((event) => {
			setScreenWidth(event[0].contentBoxSize[0].inlineSize);
			setScreenHeight(event[0].contentBoxSize[0].blockSize);
		});

		resizeObserver.observe(document.getElementById("root"));
	});

	const close = () => {
		windowsManager.close(id);
	};

	const classNames = [styles["Window-container"]];
	if (maximized)
		classNames.push(styles.Maximized);
	if (minimized)
		classNames.push(styles.Minimized);

	return (
		<Draggable
			axis="both"
			handle={".Handle"}
			defaultPosition={{ x: position.x, y: position.y }}
			position={null}
			scale={1}
			bounds={{
				top: 0,
				bottom: screenHeight - 55,
				left: -size.x + 85,
				right: screenWidth - 5
			}}
			cancel="button"
			nodeRef={nodeRef}
			disabled={maximized}
			onMouseDown={onInteract}
		>
			<div
				className={classNames.join(" ")}
				ref={nodeRef}
				style={{
					width: maximized ? null : size.x,
					height: maximized ? null : size.y,
				}}
				onClick={(event) => {
					if (!event.defaultPrevented)
						onInteract(event);
				}}
			>
				<div className={`${styles.Header} Handle`}>
					<ReactSVG className={styles["Window-icon"]} src={process.env.PUBLIC_URL + `/media/applications/icons/${app.id}.svg`}/>
					<p>{title}</p>
					<button title="Minimize" onClick={() => setMinimized(!minimized)}>
						<FontAwesomeIcon icon={faMinus}/>
					</button>
					<button title="Maximize" onClick={() => setMaximized(!maximized)}>
						<FontAwesomeIcon icon={faSquare}/>
					</button>
					<button title="Close" onClick={close}>
						<FontAwesomeIcon icon={faXmark}/>
					</button>
				</div>
				<div className={styles["Window-content"]}>
					<app.WindowContent {...options} setTitle={setTitle} close={close}/>
				</div>
			</div>
		</Draggable>
	);
}