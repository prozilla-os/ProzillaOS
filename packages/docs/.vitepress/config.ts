import { defineConfig, HeadConfig } from "vitepress";

const TITLE = "ProzillaOS Docs";
const DESCRIPTION = "Documentation for ProzillaOS and its packages.";
const LOCALE = "en_US";
const IMAGE = "https://os.prozilla.dev/docs/prozilla-os-title-banner.png";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: TITLE,
	description: DESCRIPTION,

	srcDir: "src",

	base: "/docs/",

	head: [
		["link", { rel: "icon", href: "/docs/favicon.ico" }],
		["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
		["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
		["link", { href: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap", rel: "stylesheet" }]
	],

	cleanUrls: true,

	outDir: "./dist",

	sitemap: {
		hostname: "https://os.prozilla.dev/docs/"
	},

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Demo", link: "https://os.prozilla.dev/", target: "_blank" },
			{ text: "About", link: "/about/introduction", activeMatch: "/about/" },
			{ text: "Guides", link: "/guides/getting-started", activeMatch: "/guides/" },
			{ text: "Reference", link: "/reference/configuration", activeMatch: "/reference/" }
		],

		sidebar: {
			"/about/": {
				base: "/about/",
				items: [{
					text: "About ProzillaOS",
					items: [
						{ text: "Introduction", link: "/introduction" },
						{ text: "Features", link: "/features" },
					]
				}]
			},
			"/guides/": {
				base: "/guides/",
				items: [{
					text: "Guides",
					items: [
						{ text: "Getting started", link: "/getting-started" },
						// { text: "Custom app", link: "/custom-app" },
					]
				}]
			},
			"/reference/": {
				base: "/reference/",
				items: [
					{
						text: "Overview",
						items: [
							{ text: "Configuration", link: "/configuration" },
							{ text: "Packages", link: "/packages" },
							{ text: "Glossary", link: "/glossary" },
						]
					},
					{
						text: "Classes",
						base: "/reference/classes/",
						collapsed: false,
						items: [
							{
								text: "Apps",
								base: "/reference/classes/apps/",
								collapsed: true,
								items: [
									{ text: "App", link: "app" },
								]
							},
							{
								text: "Skins",
								base: "/reference/classes/skins/",
								collapsed: true,
								items: [
									{ text: "Skin", link: "skin" },
								]
							},
							{
								text: "System",
								base: "/reference/classes/system/",
								collapsed: true,
								items: [
									{ text: "AppsConfig", link: "apps-config" },
									{ text: "DesktopConfig", link: "desktop-config" },
									{ text: "MiscConfig", link: "misc-config" },
									{ text: "ModalsConfig", link: "modals-config" },
									{ text: "TaskbarConfig", link: "taskbar-config" },
									{ text: "TrackingConfig", link: "tracking-config" },
									{ text: "WindowsConfig", link: "windows-config" },
								]
							},
							{
								text: "Utils",
								base: "/reference/classes/utils/",
								collapsed: true,
								items: [
									{ text: "Vector2", link: "vector2" },
								]
							},
						]
					},
					{
						text: "Functions",
						base: "/reference/functions/",
						collapsed: false,
						items: [
							{ text: "Array", link: "/array" },
							{ text: "Browser", link: "/browser" },
							{ text: "Date", link: "/date" },
							{ text: "Math", link: "/math" },
						]
					},
					{
						text: "Constants",
						link: "constants"
					},
				]
			},
		},

		editLink: {
			pattern: "https://github.com/prozilla-os/ProzillaOS/edit/main/packages/docs/src/:path",
			text: "Suggest changes to this page"
		},

		// lastUpdated: {
		// 	text: "Updated at",
		// 	formatOptions: {
		// 		dateStyle: "short",
		// 		timeStyle: "short"
		// 	}
		// },

		socialLinks: [
			{ icon: "github", link: "https://github.com/prozilla-os/ProzillaOS" },
			{ icon: "discord", link: "https://discord.gg/JwbyQP4tdz" },
			{ icon: "npm", link: "https://www.npmjs.com/package/prozilla-os" }
		],

		logo: {
			dark: "/logo-light.svg",
			light: "/logo-dark.svg"
		},

		siteTitle: "ProzillaOS",
		
		footer: {
			message: "Built by <strong><a href=\"https://prozilla.dev/\" target=\"_blank\">Prozilla</a></strong>",
			copyright: "Copyright &copy; 2023-present Prozilla"
		},
	},

	transformPageData(pageData) {
		pageData.frontmatter.head ??= [] as HeadConfig[];
		const head = pageData.frontmatter.head as HeadConfig[];

		const title = pageData.frontmatter.layout === "home"
			? TITLE
			: `${pageData.title} | ${TITLE}`;
		head.push(["meta", { name: "og:title", content: title }]);
		head.push(["meta", { name: "twitter:title", content: title }]);

		const description = pageData.frontmatter.description as string ?? DESCRIPTION;
		head.push(["meta", { name: "og:description", content: description }]);
		head.push(["meta", { name: "twitter:description", content: description }]);

		const canonicalUrl = `https://os.prozilla.dev/docs/${pageData.relativePath}`
			.replace(/index\.md$/, "")
			.replace(/\.(md|html)$/, "");
		head.push(["link", { rel: "canonical", href: canonicalUrl }]);
		head.push(["meta", { name: "og:url", content: canonicalUrl }]);
		head.push(["meta", { name: "twitter:url", content: canonicalUrl }]);

		const locale = LOCALE;
		head.push(["meta", { name: "og:locale", content: locale }]);

		const image = pageData.frontmatter.image as string ?? IMAGE;
		head.push(["meta", { name: "og:image", content: image }]);
		head.push(["meta", { name: "twitter:image", content: image }]);

		// Other meta data
		head.push(["meta", { name: "og:type", content: "website" }]);
		head.push(["meta", { name: "twitter:card", content: "summary_large_image" }]);
	},
});
