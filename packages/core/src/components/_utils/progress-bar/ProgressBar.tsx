import { CSSProperties } from "react";
import styles from "./ProgressBar.module.css";
import { clamp } from "../../../features/_utils/math.utils";
import { useClassNames } from "../../../hooks";

interface ProgressBarProps {
	fillPercentage: number;
	fillColor?: string;
	backgroundColor?: string;
	align?: "left";
	className?: string;
}

export function ProgressBar({ fillPercentage, fillColor, backgroundColor, align = "left", className }: ProgressBarProps) {
	return (
		<div className={useClassNames([styles.ProgressBar, className], "ProgressBar")} style={{ backgroundColor: backgroundColor }}>
			<div
				className={`${styles.Fill} ${align}`}
				style={{ backgroundColor: fillColor, "--fill": `${clamp(fillPercentage, 0.1, 100)}%` } as CSSProperties}
			/>
		</div>
	);
}