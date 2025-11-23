import { FC, forwardRef } from "react";
import { Ansi } from "./Ansi";
import styles from "./Terminal.module.css";

interface OutputLineProps {
	text?: string;
}

export const OutputLine: FC<OutputLineProps> = forwardRef<HTMLDivElement>(({ text }: OutputLineProps, ref) => {
	const lines = text?.split("\n");

	return <div ref={ref}>
		{lines?.map((line, index) =>
			<Ansi key={index} className={styles.Output} useClasses>{line === "" ? " " : line}</Ansi>
		)}
	</div>;
}) as FC;