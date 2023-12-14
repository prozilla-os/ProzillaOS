import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./WindowView.module.css";
import { faExpand, faMinus, faWindowMaximize as fasWindowMaximize, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext.js";
import Draggable from "react-draggable";
import { memo, useEffect, useRef, useState } from "react";
import Application from "../../features/applications/application.js";
import Vector2 from "../../features/math/vector2.js";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import utilStyles from "../../styles/utils.module.css";
import { useModals } from "../../hooks/modals/modals.js";
import { ModalsView } from "../modals/ModalsView.jsx";
import { useContextMenu } from "../../hooks/modals/contextMenu.js";
import AppsManager from "../../features/applications/applications.js";
import { ClickAction } from "../actions/actions/ClickAction.jsx";
import { Actions } from "../actions/Actions.jsx";
import { useScreenDimensions } from "../../hooks/utils/screen.js";

/**
 * @typedef {object} windowProps
 * @property {Application} app
 * @property {Function} setTitle
 * @property {Function} setIconUrl
 * @property {Function} close
 * @property {Function} focus
 * @property {boolean} active
 * @property {import("../../features/modals/modals.js").default} modalsManager
 */

/**
 * @param {object} props
 * @param {string} props.id 
 * @param {Application} props.app 
 * @param {Vector2} props.size 
 * @param {Vector2} props.position 
 * @param {boolean} props.focused 
 * @param {Function} props.onInteract
 * @param {object} props.options
 * @param {boolean} props.active
 * @param {boolean} props.minimized
 * @param {Function} props.toggleMinimized
 */
export const WindowView = memo(({ id, app, size, position, onInteract, options, active, minimized, toggleMinimized }) => {
	const windowsManager = useWindowsManager();
	const nodeRef = useRef(null);
	const [modalsManager, modals] = useModals();

	const [startSize, setStartSize] = useState(size);
	const [startPosition, setStartPosition] = useState(position);
	const [maximized, setMaximized] = useState(false);
	const [screenWidth, screenHeight] = useScreenDimensions();
	const [title, setTitle] = useState(app.name);
	const [iconUrl, setIconUrl] = useState(AppsManager.getAppIconUrl(app.id));

	const { onContextMenu, ShortcutsListener } = useContextMenu({ modalsManager, Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Minimize" icon={faMinus} onTrigger={toggleMinimized}/>
			<ClickAction label="Maximize" icon={faExpand} shortcut={["F11"]} onTrigger={() => {
				setMaximized(!maximized);
			}}/>
			<ClickAction label="Close" icon={faTimes} shortcut={["Control", "q"]} onTrigger={() => {
				close();
			}}/>
		</Actions>
	});

	useEffect(() => {
		if (screenWidth == null || screenHeight == null)
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
	}, [position, size, screenHeight, screenWidth]);

	const close = (event) => {
		event?.preventDefault();
		windowsManager.close(id);
	};

	const focus = (event, force = false) => {
		if (force)
			return onInteract();

		if (event?.defaultPrevented)
			return;

		if (event == null || event.target?.closest?.(".Handle") == null || event.target?.closest?.("button") == null)
			onInteract();
	};

	const classNames = [styles["Window-container"]];
	if (maximized)
		classNames.push(styles.Maximized);
	if (minimized)
		classNames.push(styles.Minimized);

	return (<>
		<ShortcutsListener/>
		<ModalsView modalsManager={modalsManager} modals={modals} style={{ zIndex: 1 }}/>
		<Draggable
			key={id}
			axis="both"
			handle={".Window-handle"}
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
			onStart={focus}
		>
			<div
				className={classNames.join(" ")}
				ref={nodeRef}
				onClick={focus}
			>
				<div
					className={styles["Window-inner"]}
					style={{
						width: maximized ? null : startSize.x,
						height: maximized ? null : startSize.y,
					}}
				>
					<div className={`${styles.Header} Window-handle`} onContextMenu={onContextMenu}>
						<ReactSVG
							className={styles["Window-icon"]}
							src={iconUrl}
						/>
						<p className={utilStyles["Text-semibold"]}>{title}</p>
						<button aria-label="Minimize" className={styles["Header-button"]} tabIndex={0} id="minimize-window"
							onClick={toggleMinimized}
						>
							<FontAwesomeIcon icon={faMinus}/>
						</button>
						<button aria-label="Maximize" className={styles["Header-button"]} tabIndex={0} id="maximize-window"
							onClick={(event) => {
								event.preventDefault();
								setMaximized(!maximized);
								focus(event, true);
							}}
						>
							<FontAwesomeIcon icon={maximized ? fasWindowMaximize : faWindowMaximize}/>
						</button>
						<button aria-label="Close" className={`${styles["Header-button"]} ${styles["Exit-button"]}`} tabIndex={0} id="close-window"
							onClick={close}>
							<FontAwesomeIcon icon={faXmark}/>
						</button>
					</div>
					<div className={styles["Window-content"]}>
						<app.WindowContent
							{...options}
							app={app}
							setTitle={setTitle}
							setIconUrl={setIconUrl}
							close={close}
							focus={focus}
							active={active}
							modalsManager={modalsManager}
						/>
					</div>
				</div>
			</div>
		</Draggable>
	</>);
});