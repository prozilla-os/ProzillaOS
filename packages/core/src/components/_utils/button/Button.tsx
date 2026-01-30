import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.css";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useClassNames } from "../../../hooks";

export interface ButtonProps {
	className?: string;
	href?: string;
	icon?: IconDefinition;
	target?: HTMLAttributeAnchorTarget;
	children?: ReactNode;
	[key: string]: unknown;
}

export function Button({ className, href, children, icon, target, ...props }: ButtonProps) {
	const classNames = [styles.Button];
	if (className != null)
		classNames.push(className);

	if (href != null) {
		classNames.push(styles.ButtonLink);

		return (<a
			{...props}
			href={href}
			target={target ?? "_blank"}
			rel="noreferrer"
			tabIndex={0}
			className={useClassNames(classNames, "Button", "Link")}
		>
			{children}
			<FontAwesomeIcon icon={icon ?? faExternalLink}/>
		</a>);
	} else {
		return (<button
			{...props}
			tabIndex={0}
			className={useClassNames(classNames, "Button")}
		>
			{children}
			{icon != null
				? <FontAwesomeIcon icon={icon}/>
				: null
			}
		</button>);
	}
}