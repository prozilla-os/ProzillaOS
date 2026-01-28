import { CSSProperties } from "react";
import styles from "./ProgressBar.module.css";
import { useClassNames } from "../../../hooks";
import { clamp } from "@prozilla-os/shared";

export interface ProgressBarProps {
	/** The amount of progress, as a percentage. */
	fillPercentage: number;
	/** The CSS color to use for the filled part of the progress bar. */
	fillColor?: string;
	/** The CSS background color of the progress bar. */
	backgroundColor?: string;
	align?: "left";
	/** `className` prop for the progress bar. */
	className?: string;
}

/**
 * Component that renders a progress bar.
 */
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