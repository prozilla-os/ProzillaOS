import { useEffect, useRef, useState } from "react";
import { Circuit } from "../../../features/apps/logic-sim/circuit";
import styles from "./CircuitView.module.css";

export function CircuitView() {
	const [circuit, setCircuit] = useState(new Circuit("Chip", "#000", 2, 1));
	const canvasRef = useRef(null);

	useEffect(() => {
		if (canvasRef.current == null && circuit.canvas != null)
			return;

		circuit.init(canvasRef.current as HTMLCanvasElement);

		return () => {
			circuit.cleanup();
		};
	}, [canvasRef, circuit]);

	return <canvas ref={canvasRef} className={styles.Canvas}/>;
}