import { ReactNode } from "react";
import styles from "../Actions.module.css";
import { useClassNames } from "../../../hooks";

export interface TextDisplayProps {
	children: ReactNode;
}

export function TextDisplay({ children }: TextDisplayProps) {
	return <p className={useClassNames([styles.TextDisplay], "Actions", "Text")}>
		{children}
	</p>;
}