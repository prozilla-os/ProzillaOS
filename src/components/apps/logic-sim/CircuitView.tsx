import { useEffect, useRef, useState } from "react";
import { Circuit } from "../../../features/apps/logic-sim/circuit";
import styles from "./CircuitView.module.css";
import { DropdownAction } from "../../actions/actions/DropdownAction";
import { HeaderMenu } from "../_utils/header-menu/HeaderMenu";
import { ClickAction } from "../../actions/actions/ClickAction";
import { ChipsManager } from "../../../features/apps/logic-sim/chipsManager";

export function CircuitView() {
	const [circuit] = useState(new Circuit("Chip", "#000", 2, 1));
	const canvasRef = useRef(null);

	useEffect(() => {
		if (canvasRef.current == null && circuit.canvas != null)
			return;

		circuit.init(canvasRef.current as HTMLCanvasElement);

		return () => {
			circuit.cleanup();
		};
	}, [canvasRef, circuit]);

	return <>
		<HeaderMenu>
			<DropdownAction label="Add" showOnHover={false}>
				<ClickAction label="AND gate" onTrigger={() => { circuit.addChip(ChipsManager.CHIPS.AND); }}/>
				<ClickAction label="NOT gate" onTrigger={() => { circuit.addChip(ChipsManager.CHIPS.NOT); }}/>
			</DropdownAction>
		</HeaderMenu>
		<canvas ref={canvasRef} className={styles.Canvas}/>
	</>;
}