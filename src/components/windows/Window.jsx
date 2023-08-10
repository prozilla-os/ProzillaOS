import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Window.module.css";
import { faMinus, faWindowMaximize as fasWindowMaximize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";
import Draggable from "react-draggable";
import { memo, useEffect, useRef, useState } from "react";
import Application from "../../features/applications/application.js";
import Vector2 from "../../features/math/vector2.js";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import utilStyles from "../../styles/utils.module.css";

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
export const Window = memo(function Window({ id, app, size, position, focused = false, onInteract, options }) {
	const windowsManager = useWindowsManager();
	const nodeRef = useRef(null);

	const [initialised, setInitialised] = useState(false);
	const [startSize, setStartSize] = useState(size);
	const [startPosition, setStartPosition] = useState(position);

	const [maximized, setMaximized] = useState(false);
	const [minimized, setMinimized] = useState(false);

	const [screenWidth, setScreenWidth] = useState(100);
	const [screenHeight, setScreenHeight] = useState(100);

	const [title, setTitle] = useState(app.name);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((event) => {
			setScreenWidth(event[0].contentBoxSize[0].inlineSize);
			setScreenHeight(event[0].contentBoxSize[0].blockSize);
			setInitialised(true);
		});

		resizeObserver.observe(document.getElementById("root"));
	}, []);

	useEffect(() => {
		if (!initialised)
			return;

		if (size.x > screenWidth || size.y > screenHeight) {
			setStartSize(new Vector2(screenWidth - 32, screenHeight - 32));
			setStartPosition(new Vector2(16, 16));
			setMaximized(true);
		} else {
			if (position.x > screenWidth) {
				position.x = 0;
				setStartPosition(position);
			}
			if (position.y > screenHeight) {
				position.y = 0;
				setStartPosition(position);
			}
		}
	}, [initialised, position, size, screenHeight, screenWidth]);

	const close = (event) => {
		event?.preventDefault();
		windowsManager.close(id);
	};

	const focus = (event, force = false) => {
		if (force)
			return onInteract();

		if (event.defaultPrevented)
			return;

		if (event.target?.closest?.(".Handle") == null || event.target?.closest?.("button") == null)
			onInteract();
	};

	const classNames = [styles["Window-container"]];
	if (maximized)
		classNames.push(styles.Maximized);
	if (minimized)
		classNames.push(styles.Minimized);

	// console.log(`Rendering window: ${id}`);

	return (
		<Draggable
			key={id}
			axis="both"
			handle={".Handle"}
			defaultPosition={startPosition}
			position={null}
			scale={1}
			bounds={{
				top: 0,
				bottom: screenHeight - 55,
				left: -startSize.x + 85,
				right: screenWidth - 5
			}}
			cancel="button"
			nodeRef={nodeRef}
			disabled={maximized}
			onMouseDown={focus}
		>
			<div
				className={classNames.join(" ")}
				ref={nodeRef}
				style={{
					width: maximized ? null : startSize.x,
					height: maximized ? null : startSize.y,
				}}
				onClick={focus}
			>
				<div className={`${styles.Header} Handle`}>
					<ReactSVG
						className={styles["Window-icon"]}
						src={process.env.PUBLIC_URL + `/media/applications/icons/${app.id}.svg`}
					/>
					<p className={utilStyles["Text-semibold"]}>{title}</p>
					<button title="Minimize" tabIndex={0} onClick={() => setMinimized(!minimized)}>
						<FontAwesomeIcon icon={faMinus}/>
					</button>
					<button title="Maximize" tabIndex={0} id="maximize-window" onClick={(event) => {
						event.preventDefault();
						setMaximized(!maximized);
						focus(event, true);
					}}>
						<FontAwesomeIcon icon={maximized ? fasWindowMaximize : faWindowMaximize}/>
					</button>
					<button title="Close" tabIndex={0} id="close-window" onClick={close}>
						<FontAwesomeIcon icon={faXmark}/>
					</button>
				</div>
				<div className={styles["Window-content"]} onClick={(event) => { console.log(event); }}>
					<app.WindowContent {...options} setTitle={setTitle} close={close} focus={focus}/>
				</div>
			</div>
		</Draggable>
	);
});