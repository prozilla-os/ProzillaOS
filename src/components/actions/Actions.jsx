import { Children, cloneElement, isValidElement } from "react";
import { useShortcuts } from "../../hooks/_utils/keyboard.js";
import styles from "./Actions.module.css";
import { useScreenBounds } from "../../hooks/_utils/screen.js";

export const STYLES = {
	CONTEXT_MENU: styles["Context-menu"],
	SHORTCUTS_LISTENER: styles["Shortcuts-listener"],
};

/**
 * @callback actionsType
 * @param {object} props
 * @param {string=} props.className
 * @param {Function} props.onAnyTrigger
 * @param {import("react").ElementType} props.children 
 * @param {*} props.triggerParams
 * @param {boolean} props.avoidTaskbar
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
export function Actions({ children, className, onAnyTrigger, triggerParams, avoidTaskbar = true }) {
	const isListener = (className === STYLES.SHORTCUTS_LISTENER);

	const { ref, initiated, alignLeft, alignTop } = useScreenBounds({ avoidTaskbar });

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
				onTrigger: (event, ...args) => {
					onAnyTrigger?.(event, triggerParams, ...args);
					onTrigger?.(event, triggerParams, ...args);
				}
			});
		});

		return newChildren;
	};

	useShortcuts({ options, shortcuts, useCategories: false });

	if (isListener)
		return iterateOverChildren(children);

	const classNames = [styles.Container];
	if (className != null)
		classNames.push(className);
	if (alignLeft)
		classNames.push(styles["Align-left"]);
	if (alignTop)
		classNames.push(styles["Align-top"]);
	if (!initiated)
		classNames.push(styles.Uninitiated);

	return (<div ref={ref} className={classNames.join(" ")}>
		{iterateOverChildren(children)}
	</div>);
}