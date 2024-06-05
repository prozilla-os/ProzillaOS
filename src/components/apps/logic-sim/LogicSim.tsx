import { CircuitView } from "./CircuitView";
import styles from "./LogicSim.module.css";

export function LogicSim() {
	return <div className={styles.LogicSim}>
		<CircuitView/>
	</div>;
}