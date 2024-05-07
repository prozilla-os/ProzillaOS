import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OutsideClickListener from "../../../hooks/_utils/outsideClick";
import { UtilMenu } from "../menus/UtilMenu";
import styles from "./Network.module.css";

/**
 * @param {object} props 
 * @param {boolean} props.hideUtilMenus 
 * @param {Function} props.showUtilMenu 
 */
export function Network({ hideUtilMenus, showUtilMenu }) {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (hideUtilMenus && showMenu) {
			setShowMenu(false);
		}
	}, [hideUtilMenus, showMenu]);

	const updateShowMenu = (show) => {
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