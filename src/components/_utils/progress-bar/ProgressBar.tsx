import { CSSProperties } from "react";
import { clamp } from "../../../features/math/clamp";
import styles from "./ProgressBar.module.css";

/**
 * @param {object} props 
 * @param {number} props.fillPercentage 
 * @param {string} props.fillColor 
 * @param {string} props.backgroundColor 
 * @param {string} props.align
 * @param {string} props.className
 */

interface ProgressBarProps {
	fillPercentage: number;
	fillColor?: string;
	backgroundColor?: string;
	align?: "left";
	className?: string;
}

export function ProgressBar({ fillPercentage, fillColor, backgroundColor, align = "left", className = "" }: ProgressBarProps) {
	return (
		<div className={`${styles.ProgressBar} ${className}`} style={{ backgroundColor: backgroundColor }}>
			<div
				className={`${styles.Fill} ${align}`}
				style={{ backgroundColor: fillColor, "--fill": `${clamp(fillPercentage, 0.1, 100)}%` } as CSSProperties}
			/>
		</div>
	);
}