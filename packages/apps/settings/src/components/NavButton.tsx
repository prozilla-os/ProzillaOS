import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NavButton.module.css";
import { utilStyles } from "@prozilla-os/core";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface NavButtonProps {
	label: string;
	icon?: IconProp;
	description?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function NavButton({ label, icon, description, onClick }: NavButtonProps) {
	return <button className={styles.NavButton} onClick={onClick}>
		{icon && <FontAwesomeIcon className={styles.Icon} icon={icon}/>}
		<span>
			<p className={`${styles.Label} ${utilStyles.TextRegular}`}>{label}</p>
			<p className={`${styles.Description} ${utilStyles.TextLight}`}>{description ?? ""}</p>
		</span>
	</button>;
}