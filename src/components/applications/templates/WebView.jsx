import Iframe from "react-iframe";
import styles from "./WebView.module.css";

/**
 * @param {Object} props
 * @param {String} props.source
 * @returns 
 */
export function WebView(props) {
	return (
		<Iframe url={props.source} className={styles["Web-view"]} {...props}/>
	);
}