import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./WindowView.module.css";
import { faCircleRight, faExpand, faMinus, faWindowMaximize as fasWindowMaximize, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import { useWindowsManager } from "../../hooks/windows/windowsManagerContext";
import Draggable from "react-draggable";
import { CSSProperties, FC, memo, MouseEventHandler, useEffect, useRef, useState } from "react";
import { Vector2 } from "../../features/math/vector2";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import utilStyles from "../../styles/utils.module.css";
import { useContextMenu } from "../../hooks/modals/contextMenu";
import { ClickAction } from "../actions/actions/ClickAction";
import { Actions } from "../actions/Actions";
import { useScreenDimensions } from "../../hooks/_utils/screen";
import { generateUrl, openUrl, setViewportIcon, setViewportTitle } from "../../features/_utils/browser.utils";
import { ZIndexManager } from "../../features/z-index/zIndexManager";
import { useZIndex } from "../../hooks/z-index/zIndex";
import { useWindowedModal } from "../../hooks/modals/windowedModal";
import { Divider } from "../actions/actions/Divider";
import { ModalsManager } from "../../features/modals/modalsManager";
import { Share } from "../modals/share/Share";
import { ErrorBoundary } from "react-error-boundary";
import { WindowFallbackView } from "./WindowFallbackView";
import { WindowOptions } from "../../features/windows/windowsManager";
import { ModalProps } from "../modals/ModalView";
import { useSystemManager } from "../../hooks";

export interface WindowProps extends WindowOptions {
	fullscreen?: boolean;
	onInteract?: Function
	setTitle?: React.Dispatch<React.SetStateAction<string>>;
	setIconUrl?: React.Dispatch<React.SetStateAction<string>>;
	close?: (event?: Event) => void;
	focus?: (event: Event, force?: boolean) => void;
	active?: boolean;
	minimized?: boolean;
	toggleMinimized?: Function;
	index?: number;
	standalone?: boolean;
}

export const WindowView: FC<WindowProps> = memo(({ id, app, size, position, onInteract, options, active, fullscreen, minimized, toggleMinimized, index }) => {
	const { systemName, windowsConfig, appsConfig } = useSystemManager();
	const windowsManager = useWindowsManager();
	const nodeRef = useRef(null);
	const { openWindowedModal } = useWindowedModal();

	const [startPosition, setStartPosition] = useState(position);
	const [maximized, setMaximized] = useState(fullscreen ?? false);
	const [screenWidth, screenHeight] = useScreenDimensions();
	const [title, setTitle] = useState(app?.name ?? "");
	const [iconUrl, setIconUrl] = useState<string>(app ? appsConfig.getAppById(app?.id)?.iconUrl ?? "" : "");
	const zIndex = useZIndex({ groupIndex: ZIndexManager.GROUPS.WINDOWS, index: index ?? 0 });

	const { onContextMenu, ShortcutsListener } = useContextMenu({ Actions: (props) =>
		<Actions {...props}>
			<ClickAction label="Minimize" icon={faMinus} onTrigger={() => { toggleMinimized?.(); }}/>
			<ClickAction label="Maximize" icon={faExpand} shortcut={["F11"]} onTrigger={() => {
				setMaximized(!maximized);
			}}/>
			<ClickAction label="Close" icon={faTimes} shortcut={["Control", "q"]} onTrigger={() => {
				close?.();
			}}/>
			<Divider/>
			<ClickAction label="Standalone mode" icon={faCircleRight} onTrigger={() => {
				if (app != null) openUrl(generateUrl({ appId: app.id, standalone: true }), "_self");
			}}/>
			<ClickAction label={"Share"} icon={ModalsManager.getModalIconUrl("share")} shortcut={["Alt", "s"]} onTrigger={() => {
				if (app != null)
					openWindowedModal({
						appId: app.id,
						fullscreen: maximized,
						size: new Vector2(350, 350),
						Modal: (props: ModalProps) => <Share {...props}/>
					});
			}}/>
		</Actions>
	});

	useEffect(() => {
		if (screenWidth == null || screenHeight == null) return;

		if (screenWidth < windowsConfig.minScreenSize.x || screenHeight < windowsConfig.minScreenSize.y) {
			setMaximized(true);
		} else if (position != null) {
			if (position.x > screenWidth) position.x = 0;
			if (position.y > screenHeight) position.y = 0;

			setStartPosition(position);
		} else {
			setStartPosition(new Vector2(0, 0));
		}
	}, [position, size, screenHeight, screenWidth]);

	useEffect(() => {
		const setViewportTitleAndIcon = () => {
			if (title != null) setViewportTitle(`${title} | ${systemName}`);
			if (iconUrl != null) setViewportIcon(iconUrl);
		};

		if (active && !minimized) setViewportTitleAndIcon();

		window.addEventListener("focus", setViewportTitleAndIcon);

		return () => {
			window.removeEventListener("focus", setViewportTitleAndIcon);
		};
	}, [active, minimized, iconUrl, title]);

	if (app == null)
		return;

	const close: WindowProps["close"] = (event) => {
		event?.preventDefault();
		if (id != null) windowsManager?.close(id);
	};

	const focus: WindowProps["focus"] = (event, force = false) => {
		if (force) {
			onInteract?.();
			return;
		}

		if (event?.defaultPrevented)
			return;

		const target = event?.target as HTMLElement;
		if (event == null || target?.closest?.(".Handle") == null || target?.closest?.("button") == null)
			onInteract?.();
	};

	const classNames = [styles["Window-container"]];
	if (maximized)
		classNames.push(styles.Maximized);
	if (minimized)
		classNames.push(styles.Minimized);

	return (<div style={{ zIndex, position: !maximized ? "relative" : null } as CSSProperties}>
		<ShortcutsListener/>
		<Draggable
			key={id}
			axis="both"
			handle={".Window-handle"}
			defaultPosition={startPosition?.round()}
			position={undefined}
			scale={1}
			bounds={{
				top: 0,
				bottom: (screenHeight ?? 0) - 55,
				left: size ? -size.x + 85 : 85,
				right: (screenWidth ?? 0) - 5
			}}
			cancel="button"
			nodeRef={nodeRef}
			disabled={maximized}
			onStart={(event) => { focus(event as Event); }}
			grid={[1, 1]}
		>
			<div
				className={classNames.join(" ")}
				ref={nodeRef}
				onClick={focus as unknown as MouseEventHandler}
			>
				<div
					className={styles["Window-inner"]}
					style={{
						width: (maximized || size == null) ? undefined : size.x,
						height: (maximized || size == null) ? undefined : size.y,
					}}
				>
					<div
						className={`${styles.Header} Window-handle`}
						onContextMenu={onContextMenu as unknown as MouseEventHandler}
						onDoubleClick={(event) => {
							setMaximized(!maximized);
							focus(event as unknown as Event, true);
						}}
					>
						<ReactSVG
							className={styles["Window-icon"]}
							src={iconUrl}
						/>
						<p className={utilStyles.TextSemibold}>{title}</p>
						<button aria-label="Minimize" className={styles["Header-button"]} tabIndex={0} id="minimize-window"
							onClick={toggleMinimized as MouseEventHandler}
						>
							<FontAwesomeIcon icon={faMinus}/>
						</button>
						{screenWidth != null && screenHeight != null
							&& screenWidth > windowsConfig.minScreenSize.x && screenHeight > windowsConfig.minScreenSize.y
							? <button aria-label="Maximize" className={styles["Header-button"]} tabIndex={0} id="maximize-window"
								onClick={(event) => {
									event.preventDefault();
									setMaximized(!maximized);
									focus(event as unknown as Event, true);
								}}
							>
								<FontAwesomeIcon icon={maximized ? fasWindowMaximize : faWindowMaximize}/>
							</button>
							: null
						}
						<button aria-label="Close" className={`${styles["Header-button"]} ${styles["Exit-button"]}`} tabIndex={0} id="close-window"
							onClick={close as unknown as MouseEventHandler}>
							<FontAwesomeIcon icon={faXmark}/>
						</button>
					</div>
					<div className={styles["Window-content"]}>
						<ErrorBoundary
							FallbackComponent={(props) => <WindowFallbackView app={app} closeWindow={close} {...props}/>}
							onReset={() => {
								// Reset the state of your app so the error doesn't happen again
							}}
							onError={(error) => {
								console.error(error);
							}}
						>
							<app.WindowContent
								{...options}
								app={app}
								setTitle={setTitle}
								setIconUrl={setIconUrl}
								close={close}
								focus={focus}
								active={active}
								standalone={false}
							/>
						</ErrorBoundary>
					</div>
				</div>
			</div>
		</Draggable>
	</div>);
});