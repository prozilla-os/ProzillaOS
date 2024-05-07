import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.css";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface ButtonProps {
	className?: string;
	href?: string;
	children?: ReactNode;
	[key: string]: any;
}

export function Button(props: ButtonProps) {
	let { className = "" } = props;
	const { href, children } = props;

	className = `${styles.Button} ${className}`;

	if (href != null) {
		className = `${styles["Button-link"]} ${className}`;

		return (<a
			href={href}
			target="_blank"
			rel="noreferrer"
			tabIndex={0}
			{...props}
			className={className}
		>
			{children}
			<FontAwesomeIcon icon={faExternalLink}/>
		</a>);
	} else {
		return (<button
			tabIndex={0}
			{...props}
			className={className}
		>
			{children}
		</button>);
	}
}