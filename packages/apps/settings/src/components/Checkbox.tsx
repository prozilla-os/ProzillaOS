import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Settings.module.css";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

export interface CheckboxProps {
	active: boolean;
	setActive: (active: boolean) => void;
}

export function Checkbox({ active = false, setActive }: CheckboxProps) {
	return <button
		onClick={(_event) => setActive(!active)}
		className={`${styles.Checkbox} ${active ? "Checked" : ""}`}
	>
		{active 
			? <FontAwesomeIcon icon={faSquareCheck}/>
			: <FontAwesomeIcon icon={faSquare}/>
		}
	</button>;
}