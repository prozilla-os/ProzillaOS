import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./NoRoute.module.css";
import { Button } from "../../components/_utils/button/Button";
import utilStyles from "../../styles/utils.module.css";

export interface NoRouteProps {
	/**
	 * Title of the route
	 * @default "404: Not Found"
	 */
	title: string;
} 

export function NoRoute() {
	return <span className={styles.NoRoute}>
		<p className={`${styles.Title} ${utilStyles.TextSemibold}`}>404: Not Found</p>
		<Button className={styles.Link} icon={faArrowRight} href="/" target="_self">Home</Button>
	</span>;
}