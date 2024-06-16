import { Children, cloneElement, isValidElement, ReactElement, ReactNode, Ref } from "react";
import { useShortcuts } from "../../hooks/_utils/keyboard";
import styles from "./Actions.module.css";
import { useScreenBounds } from "../../hooks/_utils/screen";
import { ActionsManager } from "../../features/actions/actionsManager";

export interface ActionProps {
	actionId?: string;
	label?: string;
	icon?: string | object;
	shortcut?: string[];
	onTrigger?: (event?: Event, triggerParams?: unknown, ...args: unknown[]) => void;
	children?: ReactNode;
	disabled?: boolean;
}

export interface ActionsProps {
	mode?: string;
	className?: string;
	onAnyTrigger?: (event: Event, triggerParams: unknown, ...args: unknown[]) => void;
	children?: ReactNode;
	triggerParams?: unknown;
	avoidTaskbar?: boolean;
	[key: string]: unknown;
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
export function Actions({ children, mode, className, onAnyTrigger, triggerParams, avoidTaskbar = true }: ActionsProps): ReactElement {
	const isListener = (mode === ActionsManager.MODES.shortcutsListener);

	const { ref, initiated, alignLeft, alignTop } = useScreenBounds({ avoidTaskbar });

	const options: Record<number, Function> = {};
	const shortcuts: Record<number, string[]> = {};

	let actionId = 0;
	const iterateOverChildren = (children: ReactNode): ReactNode => {
		const newChildren = Children.map(children, (child) => {
			if (!isValidElement(child))
				return child;

			actionId++;

			const { label, shortcut, disabled, onTrigger } = child.props as ActionProps;

			const onTriggerOverride = (event: Event, ...args: unknown[]) => {
				if (disabled)
					return;
				
				onAnyTrigger?.(event, triggerParams, ...args);
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
				...child.props,
				actionId,
				children: iterateOverChildren((child.props as ActionProps).children),
				onTrigger: onTriggerOverride,
				disabled
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