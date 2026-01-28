import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { NavigationItem, NavigationJSON } from "typedoc-plugin-markdown";
import { DefaultTheme } from "vitepress";

export interface PackageData {
	text: string;
	link: string;
	items?: DefaultTheme.SidebarItem[];
	auto?: boolean;
	category: "Bundle" | "Libraries" | "Apps";
};

export const PACKAGES: PackageData[] = [
	{
		text: "prozilla-os",
		link: "prozilla-os",
		category: "Bundle",
	},
	{
		text: "@prozilla-os/core",
		link: "core",
		category: "Libraries",
		auto: true,
	},
	{
		text: "@prozilla-os/skins",
		link: "skins",
		category: "Libraries",
		auto: true,
	},
	{
		text: "@prozilla-os/shared",
		link: "shared",
		category: "Libraries",
		auto: true,
	},
	{
		text: "@prozilla-os/dev-tools",
		link: "dev-tools",
		category: "Libraries",
		auto: true,
	},
	{
		text: "@prozilla-os/calculator",
		link: "apps/calculator",
		category: "Apps",
		auto: true,
	},
	{
		text: "@prozilla-os/file-explorer",
		link: "apps/file-explorer",
		category: "Apps",
		auto: true,
	},
	{
		text: "@prozilla-os/media-viewer",
		link: "apps/media-viewer",
		category: "Apps",
		auto: true,
	},
	{
		text: "@prozilla-os/settings",
		link: "apps/settings",
		category: "Apps",
		auto: true,
	},
	{
		text: "@prozilla-os/terminal",
		link: "apps/terminal",
		category: "Apps",
		auto: true,
	},
	{
		text: "@prozilla-os/text-editor",
		link: "apps/text-editor",
		category: "Apps",
		auto: true,
	},
	{
		text: "@prozilla-os/logic-sim",
		link: "apps/logic-sim",
		category: "Apps",
		auto: true,
	},
];

export const packageSidebars = (packages: PackageData[]): DefaultTheme.Sidebar => {
	const sidebar: DefaultTheme.Sidebar = {};

	packages.forEach(({ text, link, items = [], auto = false }) => {
		const base = `/reference/${link}`;

		const packageItems: DefaultTheme.SidebarItem[] = items;
		if (auto) {
			const path = resolve(__dirname, `../src${base}/nav.json`);

			if (existsSync(path)) {
				packageItems.push({
					text: "Index",
					link: "/api",
				});

				const content = readFileSync(path, "utf-8");
				const navigation = JSON.parse(content) as NavigationJSON;
				navigation.forEach((group: NavigationItem) => {
					const groupItems: DefaultTheme.SidebarItem[] = group.children?.map((child) => {
						return {
							text: child.title,
							link: child.path?.replace(group.title, ""),
							collapsed: true,
						};
					}) ?? [];

					packageItems.push({
						text: group.title,
						base: base + "/" + group.title,
						collapsed: true,
						items: groupItems,
					});
				});
			}
		}

		sidebar[base] = {
			base,
			items: [
				{
					text,
					items: [
						{ text: "Info", link: "/" },
						...packageItems,
					],
				},
			],
		};
	});

	return sidebar;
};

export const packageReferenceItems = (packages: PackageData[]): DefaultTheme.SidebarItem[] => {
	const categories: Record<string, DefaultTheme.SidebarItem> = {};

	packages.forEach(({ text, link, category }) => {
		if (!Object.keys(categories).includes(category)) {
			categories[category] = {
				text: category,
				collapsed: true,
				items: [],
			};
		}

		categories[category].items?.push({
			text,
			link: "/" + link,
		});
	});

	return Object.values(categories);
};