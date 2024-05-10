import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OutsideClickListener from "../../../hooks/_utils/outsideClick";
import { UtilMenu } from "../menus/UtilMenu";
import styles from "./Network.module.css";

interface NetworkProps {
	hideUtilMenus: boolean;
	showUtilMenu: Function;
}

export function Network({ hideUtilMenus, showUtilMenu }: NetworkProps) {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (hideUtilMenus && showMenu) {
			setShowMenu(false);
		}
	}, [hideUtilMenus, showMenu]);

	const updateShowMenu = (show: boolean) => {
		if (show)
			showUtilMenu();

		setShowMenu(show);
	};

	return (<OutsideClickListener onOutsideClick={() => { updateShowMenu(false); }}>
		<button title="Network" tabIndex={0} onClick={() => { updateShowMenu(!showMenu); }}>
			<FontAwesomeIcon icon={faWifi}/>
		</button>
		<UtilMenu active={showMenu} setActive={setShowMenu} className={styles.Menu}>
			<FontAwesomeIcon icon={faWifi}/>
			<p>Connected</p>
		</UtilMenu>
	</OutsideClickListener>);
}