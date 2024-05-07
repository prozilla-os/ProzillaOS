import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { useShortcuts } from "../../hooks/_utils/keyboard";
import styles from "./Actions.module.css";
import { useScreenBounds } from "../../hooks/_utils/screen";

export const STYLES = {
	CONTEXT_MENU: styles["Context-menu"],
	SHORTCUTS_LISTENER: styles["Shortcuts-listener"],
};

export interface ActionProps {
	actionId?: string;
	label?: string;
	icon?: string|object;
	shortcut?: string[];
	onTrigger?: (event: Event, triggerParams: any, ...args: any[]) => void;
	children?: ReactNode;
}

export interface ActionsProps {
	className?: string;
	onAnyTrigger?: (event: Event, triggerParams: any, ...args: any[]) => void;
	children?: ReactNode;
	triggerParams?: any;
	avoidTaskbar?: boolean;
}

/** 
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
export function Actions({ children, className, onAnyTrigger, triggerParams, avoidTaskbar = true }: ActionsProps): ReactNode {
	const isListener = (className === STYLES.SHORTCUTS_LISTENER);

	const { ref, initiated, alignLeft, alignTop } = useScreenBounds({ avoidTaskbar });

	const options = {};
	const shortcuts = {};

	const iterateOverChildren = (children: ReactNode) => {
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

	return <div ref={ref} className={classNames.join(" ")}>
		{iterateOverChildren(children)}
	</div>;
}