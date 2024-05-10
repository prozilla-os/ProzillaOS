import { ChangeEventHandler, useState } from "react";
import styles from "./Share.module.css";

interface OptionProps {
	name: string;
	label: string;
	setOption: Function;
}

export default function Option({ name, label, setOption }: OptionProps) {
	const [value, setValue] = useState("");

	const onChange = (event: Event) => {
		const newValue = (event.target as HTMLInputElement).value;
		setValue(newValue);
		setOption(name, newValue);
	};

	return <label className={styles.Label}>
		<p>{label}:</p>
		<input className={styles.Input} name={name} type="text" value={value} onChange={onChange as unknown as ChangeEventHandler}/>
	</label>;
}