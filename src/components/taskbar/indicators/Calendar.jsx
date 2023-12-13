import { useEffect, useState } from "react";
import styles from "./Calendar.module.css";

export function Calendar() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		setInterval(() => {
			setDate(new Date());
		}, 30000);
	}, []);

	return (
		<button className={styles.Button} title="Date & Time" style={{ userSelect: "none" }} tabIndex={0}>
			{date.toLocaleString("en-US", {
				hour: "numeric",
				minute: "numeric",
				hour12: false,
			})}
			<br/>
			{date.toLocaleDateString("en-GB", {
				day: "numeric",
				month: "short",
				year: "numeric",
			})}
		</button>
	);
}