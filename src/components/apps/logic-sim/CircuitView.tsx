import { useEffect, useRef, useState } from "react";
import { Circuit } from "../../../features/apps/logic-sim/core/circuit";
import styles from "./CircuitView.module.css";
import { DropdownAction } from "../../actions/actions/DropdownAction";
import { HeaderMenu } from "../_utils/header-menu/HeaderMenu";
import { ClickAction } from "../../actions/actions/ClickAction";
import { ChipsManager } from "../../../features/apps/logic-sim/chips/chipsManager";
import App from "../../../features/apps/app";
import { useAppFolder } from "../../../hooks/apps/appFolder";
import { openUrl } from "../../../features/_utils/browser.utils";

interface CircuitViewProps {
	app: App;
}

export function CircuitView({ app }: CircuitViewProps) {
	const virtualFolder = useAppFolder(app);
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
			<DropdownAction label="Circuit" showOnHover={false}>
				<ClickAction label="New" onTrigger={() => { circuit.reset(); }}/>
				<ClickAction label="Save" onTrigger={() => {
					ChipsManager.saveCircuit(circuit, virtualFolder);
				}}/>
				<ClickAction label="Load" onTrigger={() => {
					ChipsManager.loadCircuit(circuit, virtualFolder);
				}}/>
			</DropdownAction>
			<DropdownAction label="Add" showOnHover={false}>
				<ClickAction label="AND gate" onTrigger={() => {
					circuit.inputHandler.startChipPlacement(ChipsManager.CHIPS.AND);
				}}/>
				<ClickAction label="NOT gate" onTrigger={() => {
					circuit.inputHandler.startChipPlacement(ChipsManager.CHIPS.NOT);
				}}/>
			</DropdownAction>
			<DropdownAction label="Help" showOnHover={false}>
				<ClickAction label="Digital Electronics Glossary" onTrigger={() => {
					openUrl("http://www.pmcgibbon.net/teachcte/electron/degloss1.htm");
				}}/>
			</DropdownAction>
		</HeaderMenu>
		<div className={styles.CircuitView}>
			<canvas ref={canvasRef} className={styles.Canvas}/>
		</div>
	</>;
}