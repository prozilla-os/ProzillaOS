import { useClassNames } from "../../../hooks";
import styles from "../Actions.module.css";

export function Divider() {
	return <div className={useClassNames([styles.Divider], "Actions", "Divider")}/>;
}