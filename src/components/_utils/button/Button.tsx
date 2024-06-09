import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.css";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
	className?: string;
	href?: string;
	icon?: IconProp;
	target?: HTMLAttributeAnchorTarget;
	children?: ReactNode;
	[key: string]: unknown;
}

export function Button(props: ButtonProps) {
	let { className = "" } = props;
	const { href, children, icon, target } = props;

	className = `${styles.Button} ${className}`;

	if (href != null) {
		className = `${styles.ButtonLink} ${className}`;

		return (<a
			href={href}
			target={target ?? "_blank"}
			rel="noreferrer"
			tabIndex={0}
			{...props}
			className={className}
		>
			{children}
			<FontAwesomeIcon icon={icon ?? faExternalLink}/>
		</a>);
	} else {
		return (<button
			tabIndex={0}
			{...props}
			className={className}
		>
			{children}
			{icon != null
				? <FontAwesomeIcon icon={icon}/>
				: null
			}
		</button>);
	}
}