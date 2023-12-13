import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { useShortcuts } from "../../hooks/utils/keyboard.js";
import style from "./Actions.module.css";
import { useScreenDimensions } from "../../hooks/utils/screen.js";
import { TASK_BAR_HEIGHT } from "../../constants/taskBar.js";

export const STYLES = {
	CONTEXT_MENU: style["Context-menu"],
	SHORTCUTS_LISTENER: style["Shortcuts-listener"],
};

/**
 * @callback actionsType
 * @param {object} props
 * @param {string=} props.className
 * @param {Function} props.onAnyTrigger
 * @param {import("react").ElementType} props.children 
 * @param {*} props.triggerParams
 * @param {boolean} props.avoidTaskBar
 */

/** 
 * @type {actionsType} 
 * @example
 * <ClickAction
 * 	label="Reload"
 * 	shortcut={["Control", "r"]}
 * 	icon={faArrowsRotate}
 * 	onTrigger={() => {
 * 		reloadViewport();
 * 	}}
 * />
 */
export function Actions({ children, className, onAnyTrigger, triggerParams, avoidTaskBar = true }) {
	const isListener = (className === STYLES.SHORTCUTS_LISTENER);

	const ref = useRef(null);
	const [initiated, setInitiated] = useState(false);
	const [alignLeft, setAlignLeft] = useState(false);
	const [alignTop, setAlignTop] = useState(false);
	const [screenWidth, screenHeight] = useScreenDimensions();

	const options = {};
	const shortcuts = {};

	const iterateOverChildren = (children) => {
		let actionId = 0;
		const newChildren = Children.map(children, (child) => {
			if (!isValidElement(child))
				return child;

			actionId++;

			const { label, shortcut, onTrigger } = child.props;
			if (label != null && onTrigger != null) {
				options[actionId] = onTrigger;

				if (shortcut != null)
					shortcuts[actionId] = shortcut;
			}

			if (isListener) {
				iterateOverChildren(child.props.children);
				return;
			}
		
			return cloneElement(child, {
				...child.props,
				actionId,
				children: iterateOverChildren(child.props.children),
				onTrigger: (event) => {
					onAnyTrigger?.(event, triggerParams);
					onTrigger?.(event, triggerParams);
				}
			});
		});

		return newChildren;
	};

	useShortcuts({ options, shortcuts, useCategories: false });

	useEffect(() => {
		if (ref.current == null || screenWidth == null || screenHeight == null)
			return;

		const rect = ref.current.getBoundingClientRect();
		const maxX = screenWidth;
		let maxY = screenHeight;

		if (avoidTaskBar)
			maxY -= TASK_BAR_HEIGHT;

		const isOverflowingRight = (rect.x + rect.width > maxX);
		const isOverflowingBottom = (rect.y + rect.height > maxY);

		if (isOverflowingRight)
			setAlignLeft(true);
		if (isOverflowingBottom)
			setAlignTop(true);

		setInitiated(true);
	}, [alignLeft, avoidTaskBar, screenHeight, screenWidth]);

	if (isListener)
		return iterateOverChildren(children);

	const classNames = [style.Container];
	if (className != null)
		classNames.push(className);
	if (alignLeft)
		classNames.push(style["Align-left"]);
	if (alignTop)
		classNames.push(style["Align-top"]);
	if (!initiated)
		classNames.push(style.Uninitiated);

	return (<div ref={ref} className={classNames.join(" ")}>
		{iterateOverChildren(children)}
	</div>);
}