import { Children, cloneElement, isValidElement, ReactElement, ReactNode, Ref } from "react";
import { useShortcuts } from "../../hooks/_utils/keyboard";
import styles from "./Actions.module.css";
import { useScreenBounds } from "../../hooks/_utils/screen";
import { STYLES } from "../../config/actions.config";

export interface ActionProps {
	actionId?: string;
	label?: string;
	icon?: string | object;
	shortcut?: string[];
	onTrigger?: (event?: Event, triggerParams?: unknown, ...args: unknown[]) => void;
	children?: ReactNode;
}

export interface ActionsProps {
	className?: string;
	onAnyTrigger?: (event: Event, triggerParams: unknown, ...args: unknown[]) => void;
	children?: ReactNode;
	triggerParams?: unknown;
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
export function Actions({ children, className, onAnyTrigger, triggerParams, avoidTaskbar = true }: ActionsProps): ReactElement {
	const isListener = (className === STYLES.SHORTCUTS_LISTENER);

	const { ref, initiated, alignLeft, alignTop } = useScreenBounds({ avoidTaskbar });

	const options = {};
	const shortcuts = {};

	let actionId = 0;
	const iterateOverChildren = (children: ReactNode): ReactNode => {
		const newChildren = Children.map(children, (child) => {
			if (!isValidElement(child))
				return child;

			actionId++;

			const { label, shortcut, onTrigger } = child.props as ActionProps;

			const onTriggerOverride = (event: Event, ...args: unknown[]) => {
				onAnyTrigger?.(event, triggerParams, ...args);
				onTrigger?.(event, triggerParams, ...args);
			};

			// Register shortcut
			if (label != null && onTrigger != null) {
				options[actionId] = onTriggerOverride;

				if (shortcut != null)
					shortcuts[actionId] = shortcut;
			}

			// Prevent listener from rendering
			if (isListener)
				return iterateOverChildren((child.props as ActionProps).children);

			return cloneElement(child, {
				...child.props,
				actionId,
				children: iterateOverChildren((child.props as ActionProps).children),
				onTrigger: onTriggerOverride
			} as ActionProps);
		});

		return newChildren;
	};

	useShortcuts({ options, shortcuts, useCategories: false });

	if (isListener)
		return iterateOverChildren(children) as ReactElement;

	const classNames = [styles.Actions];
	if (className != null)
		classNames.push(className);
	if (alignLeft)
		classNames.push(styles.AlignLeft);
	if (alignTop)
		classNames.push(styles.AlignTop);
	if (!initiated)
		classNames.push(styles.Uninitiated);

	return <div ref={ref as Ref<HTMLDivElement>} className={classNames.join(" ")}>
		{iterateOverChildren(children)}
	</div>;
}