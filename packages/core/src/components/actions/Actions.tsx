import { Children, cloneElement, isValidElement, ReactElement, ReactNode, Ref } from "react";
import { useShortcuts } from "../../hooks/_utils/keyboard";
import styles from "./Actions.module.css";
import { useScreenBounds } from "../../hooks/_utils/screen";
import { ActionsManager } from "../../features/actions/actionsManager";

export interface ActionProps {
	/** ID of the action. */
	actionId?: string;
	/** Label of the action. */
	label?: string;
	/** Icon for the action. */
	icon?: string | object;
	/** Keyboard shortcut for the action. */
	shortcut?: string[];
	/** Function that handles the trigger event for the action. */
	onTrigger?: (event?: Event, triggerParams?: unknown, ...args: unknown[]) => void;
	children?: ReactNode;
	/** Whether the action should be disabled. */
	disabled?: boolean;
}

export interface ActionsProps {
	mode?: string;
	/** `className` prop for the container. */
	className?: string;
	/** Function that handles the trigger event for all actions. */
	onAnyTrigger?: (event: Event, triggerParams: unknown, ...args: unknown[]) => void;
	children?: ReactNode;
	/** The parameters to pass whenever an action is triggered. */
	triggerParams?: unknown;
	/** Whether the actions should automatically orient themselves to not overlap with the taskbar. */
	avoidTaskbar?: boolean;
	[key: string]: unknown;
}

/** 
 * Component that renders a collection of actions (e.g., as a context menu or a header menu) and handles keyboard shortcuts.
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
export function Actions({ children, mode, className, onAnyTrigger, triggerParams, avoidTaskbar = true }: ActionsProps): ReactElement {
	const isListener = (mode === ActionsManager.MODES.shortcutsListener);

	const { ref, initiated, alignLeft, alignTop } = useScreenBounds({ avoidTaskbar });

	const options: Record<number, (event: Event, ...args: unknown[]) => void> = {};
	const shortcuts: Record<number, string[]> = {};

	let actionId = 0;
	const iterateOverChildren = (children: ReactNode): ReactNode => {
		const newChildren = Children.map(children, (child) => {
			if (!isValidElement(child))
				return child;

			actionId++;

			const { label, shortcut, disabled, onTrigger } = child.props as ActionProps;

			const onTriggerOverride = (event?: Event, ...args: unknown[]) => {
				if (disabled)
					return;
				
				if (event) {
					onAnyTrigger?.(event, triggerParams, ...args);
				}
				onTrigger?.(event, triggerParams, ...args);
			};

			// Register shortcut
			if (!disabled && label != null && onTrigger != null) {
				options[actionId] = onTriggerOverride;

				if (shortcut != null)
					shortcuts[actionId] = shortcut;
			}

			// Prevent listener from rendering
			if (isListener)
				return iterateOverChildren((child.props as ActionProps).children);

			return cloneElement(child, {
				...(child.props as ActionProps),
				actionId: actionId.toString(),
				children: iterateOverChildren((child.props as ActionProps).children),
				onTrigger: onTriggerOverride,
				disabled,
			} as ActionProps);
		});

		return newChildren;
	};

	useShortcuts({ options, shortcuts, useCategories: false });

	if (isListener)
		return iterateOverChildren(children) as ReactElement;

	const classNames = [styles.Actions];
	if (mode != null)
		classNames.push(styles[mode]);
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