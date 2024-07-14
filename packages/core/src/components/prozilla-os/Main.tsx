import { ReactNode } from "react";
import styles from "./Main.module.css";
import { useClassNames } from "../../hooks/_utils/classNames";

interface MainProps {
	children: ReactNode;
}

export function Main({ children }: MainProps) {
	return <div
		onContextMenu={(event) => { event.preventDefault(); }}
		className={useClassNames([styles.Main], "Main")}
	>
		{children}
	</div>;
}