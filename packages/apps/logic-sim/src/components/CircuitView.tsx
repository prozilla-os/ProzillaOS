import { useEffect, useRef, useState } from "react";
import styles from "./CircuitView.module.css";
import { App, ClickAction, DropdownAction, HeaderMenu, openUrl, useAppFolder } from "@prozilla-os/core";
import { Circuit } from "../core/circuit";
import { ChipsManager } from "../core/chips/chipsManager";

interface CircuitViewProps {
	app?: App;
}

export function CircuitView({ app }: CircuitViewProps) {
	const virtualFolder = useAppFolder(app);
	const [circuit] = useState(new Circuit("Chip", "#000", 2, 1));
	const canvasRef = useRef(null);

	useEffect(() => {
		if (canvasRef.current == null && circuit.canvas != null)
			return;

		circuit.init(canvasRef.current as unknown as HTMLCanvasElement);

		return () => {
			circuit.cleanup();
		};
	}, [canvasRef, circuit]);

	return <>
		<HeaderMenu>
			<DropdownAction label="Circuit" showOnHover={false}>
				<ClickAction label="New" onTrigger={() => { circuit.reset(); }}/>
				<ClickAction label="Save" onTrigger={() => {
					if (virtualFolder != null)
						ChipsManager.saveCircuit(circuit, virtualFolder);
				}}/>
				<ClickAction label="Load" onTrigger={() => {
					if (virtualFolder != null)
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