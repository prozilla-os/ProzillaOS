import { FC, ReactNode, useState } from "react";
import styles from "../Settings.module.css";
import { NavButton } from "../NavButton";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type Page = {
	title: string,
	description?: string,
	icon?: IconProp,
	Content: FC,
};

export interface SettingsNavPageProps<PageKey extends string> {
	title: string;
	pages: Record<PageKey, Page>;
	children?: ReactNode;
}

export function SettingsNavPage<PageKey extends string>({ title, pages, children }: SettingsNavPageProps<PageKey>) {
	const [pageKey, setPageKey] = useState<PageKey | null>(null);
	const page = pageKey ? pages[pageKey] : null;

	return <div className={`${styles.Option} ${styles.OptionList}`}>
		{page != null
			? <>
				<span className={styles.Breadcrumbs}>
					<button className={styles.Label} onClick={(_event) => setPageKey(null)}>{title}</button>
					<p>{page.title}</p>
				</span>
				<page.Content/>
			</>
			: <>
				<p className={`${styles.Label} ${styles.Breadcrumbs}`}>{title}</p>
				{Object.keys(pages).map((key) => {
					const page = pages[key as PageKey];
					return <NavButton
						key={key}
						icon={page.icon}
						label={page.title}
						description={page.description}
						onClick={(_event) => setPageKey(key as PageKey)}
					/>;
				})}
				{children}
			</>
		}
	</div>;
}