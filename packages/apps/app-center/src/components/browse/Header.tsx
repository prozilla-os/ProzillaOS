import { APP_CATEGORIES } from "@prozilla-os/core";
import styles from "./Header.module.css";
import { type CategoryType } from "../AppCenter";
import { type RegistryEntrySnapshot } from "../../core/appRegistry";

interface HeaderProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	entries: readonly RegistryEntrySnapshot[];
	category: CategoryType;
	setCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
}

export function Header({ searchQuery, setSearchQuery, entries, category: currentCategory, setCategory }: HeaderProps) {
	return <div className={styles.Header}>
		<div className={styles.SearchRow}>
			<input
				className={styles.SearchInput}
				value={searchQuery}
				onChange={(event) => setSearchQuery(event.target.value)}
				type="text"
				placeholder="Search apps..."
			/>
		</div>
		<div className={styles.CategoryBar}>
			<button
				className={`${styles.CategoryPill} ${currentCategory === "All" ? styles.Active : ""}`}
				onClick={() => setCategory("All")}
			>
				All
			</button>
			{APP_CATEGORIES
				.filter((category) => entries.find((entry) => entry.category === category) != null)
				.map((category) =>
					<button
						key={category}
						className={`${styles.CategoryPill} ${category === currentCategory ? styles.Active : ""}`}
						onClick={() => setCategory(category)}
					>
						{category}
					</button>
				)
			}
		</div>
	</div>;
}
