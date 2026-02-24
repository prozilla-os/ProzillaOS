import { Actions, ActionsProps, ClickAction } from "@prozilla-os/core";
import { Chip } from "../../core/chips/chip";

export interface ChipContextMenuProps extends ActionsProps {
	chip: Chip;
}

export function ChipContextMenu({ chip, ...props }: ChipContextMenuProps) {
	return <Actions {...props}>
		<ClickAction label="Delete" onTrigger={() => {
			chip.delete();
		}}/>
		<ClickAction label="Duplicate" onTrigger={() => {
			chip.circuit.inputHandler.startChipPlacement(chip);
		}}/>
	</Actions>;
}