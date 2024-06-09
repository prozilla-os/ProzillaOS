import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import utilStyles from "../../../styles/utils.module.css";
import { Button } from "../../_utils/button/Button";
import styles from "./NoRoute.module.css";

export function NoRoute() {
	return <span className={styles.NoRoute}>
		<p className={`${styles.Title} ${utilStyles.TextSemibold}`}>404: Not Found</p>
		<Button className={styles.Link} icon={faArrowRight} href="/" target="_self">Home</Button>
	</span>;
}