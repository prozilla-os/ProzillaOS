import { WindowProps } from "@prozilla-os/core";
import { CircuitView } from "./CircuitView";
import styles from "./LogicSim.module.css";

export function LogicSim({ app }: WindowProps) {
	return <div className={styles.LogicSim}>
		<CircuitView app={app}/>
	</div>;
}