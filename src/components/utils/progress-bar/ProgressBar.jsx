import { clamp } from "../../../features/math/clamp.js";
import styles from "./ProgressBar.module.css";

/**
 * @param {object} props 
 * @param {number} props.fillPercentage 
 * @param {string} props.fillColor 
 * @param {string} props.backgroundColor 
 * @param {string} props.align
 * @param {string} props.className
 */
export function ProgressBar({ fillPercentage, fillColor, backgroundColor, align = "left", className = "" }) {
	return (
		<div className={`${styles.Container} ${className}`} style={{ backgroundColor: backgroundColor }}>
			<div
				className={`${styles.Fill} ${align}`}
				style={{ backgroundColor: fillColor, "--fill": `${clamp(fillPercentage, 0.1, 100)}%` }}
			/>
		</div>
	);
}