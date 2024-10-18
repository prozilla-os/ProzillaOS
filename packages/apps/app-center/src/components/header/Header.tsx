import { ChangeEvent } from "react";
import styles from "./Header.module.css";
import { APP_CATEGORIES, useSystemManager } from "@prozilla-os/core";
import { CategoryType } from "../AppCenter";

interface HeaderProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	category: CategoryType;
	setCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
}

export function Header({ searchQuery, setSearchQuery, category, setCategory }: HeaderProps) {
	const { appsConfig } = useSystemManager();

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setCategory(event.target.value as CategoryType);
	};

	return <div className={styles.Header}>
		<input className={styles.SearchInput} value={searchQuery} onChange={handleSearchChange} type="text" placeholder="Search..."/>
		<select className={styles.CategoryInput} value={category} onChange={handleCategoryChange}>
			<option value={"All"}>All</option>
			{APP_CATEGORIES.filter((category) => {
				return appsConfig.getAppsByCategory(category).length > 0
			}).map((category) =>
				<option value={category}>{category}</option>
			)}
		</select>
	</div>;
}