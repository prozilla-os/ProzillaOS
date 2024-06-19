import { ReactSVG } from "react-svg";
import { NAME } from "../../config/branding.config";
import styles from "./StandaloneHeader.module.css";
import { Button } from "prozilla-os";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface StandaloneHeaderProps {
	exit: Function;
}

export function StandaloneHeader({ exit }: StandaloneHeaderProps) {
	return <header className={styles.Header}>
		<a className={styles.Logo} href="/" tabIndex={0}>
			<ReactSVG src={"/assets/logo.svg"}/>
			<h1>{NAME}</h1>
		</a>
		<Button className={styles.ExitButton} onClick={exit} icon={faTimes}>
			Exit
		</Button>
	</header>;
}