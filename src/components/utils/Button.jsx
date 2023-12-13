import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.css";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {object} props 
 * @param {string} props.className
 * @param {string} props.href 
 */
export function Button(props) {
	let { className = "" } = props;
	const { href, children } = props;

	className = `${styles.Button} ${className}`;

	if (href != null) {
		className = `${styles["Button-link"]} ${className}`;

		return (<a
			href={href}
			target="_blank"
			rel="noreferrer"
			tabIndex={0}
			{...props}
			className={className}
		>
			{children}
			<FontAwesomeIcon icon={faExternalLink}/>
		</a>);
	} else {
		return (<button
			tabIndex={0}
			{...props}
			className={className}
		>
			{children}
		</button>);
	}
}