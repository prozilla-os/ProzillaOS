import { useState } from "react";
import styles from "./Share.module.css";

export default function Option({ name, label, setOption }) {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		const newValue = event.target.value;
		setValue(newValue);
		setOption(name, newValue);
	};

	return <label className={styles.Label}>
		<p>{label}:</p>
		<input className={styles.Input} name={name} type="text" value={value} onChange={onChange}/>
	</label>;
}