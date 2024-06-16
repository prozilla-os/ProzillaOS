import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import styles from "./FileExplorer.module.css";
import { MouseEventHandler } from "react";
import { utilStyles } from "@prozilla-os/core";

interface QuickAcessButton {
	onClick: MouseEventHandler;
	icon: FontAwesomeIconProps["icon"];
	name: string;
}

export function QuickAccessButton({ onClick, icon, name }: QuickAcessButton) {
	return (
		<button
			tabIndex={0}
			className={`${styles.NavButton} ${utilStyles.TextSemibold}`}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon}/>
			{name}
		</button>
	);
}