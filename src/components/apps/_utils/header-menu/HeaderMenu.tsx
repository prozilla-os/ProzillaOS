import { useShortcuts } from "../../../../hooks/_utils/keyboard";
import { DropdownButton } from "../../../_utils/dropdown-button/DropdownButton";
import styles from "./HeaderMenu.module.css";

interface HeaderMenuProps {
	options: Record<string, Record<string, Function>> | Record<string, Function>;
	shortcuts: Record<string, Record<string, string[]>> | Record<string, string[]>;
}

export function HeaderMenu({ options, shortcuts }: HeaderMenuProps) {
	useShortcuts({ options, shortcuts });

	return (
		<div className={styles.Container}>
			{Object.entries(options).map(([key, value]) => 
				<DropdownButton key={key} label={key} options={value} shortcuts={shortcuts[key]}/>
			)}
		</div>
	);
}