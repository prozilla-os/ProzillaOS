import { ReactNode } from "react";
import styles from "../Actions.module.css";

export interface TextDisplayProps {
	children: ReactNode;
}

export function TextDisplay({ children }: TextDisplayProps) {
	return <p className={styles.TextDisplay}>
		{children}
	</p>;
}