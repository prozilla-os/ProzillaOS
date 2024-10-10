import { defineConfig, HeadConfig } from "vitepress";
import { packageReferenceItems, PACKAGES, packageSidebars } from "./packages.config";
import { DESCRIPTION, IMAGE, LOCALE, TITLE } from "./meta.config";

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
						{ text: "Self-hosting", link: "/self-hosting" },
					]
				}]
			},
			"/reference/": {
				base: "/reference/",
				items: [
					{
						text: "Reference",
						items: [
							{ text: "Configuration", link: "/configuration" },
							{ text: "Glossary", link: "/glossary" },
						],
					},
					{
						text: "Packages",
						items: [
							{ text: "Overview", link: "/packages" },
							...packageReferenceItems(PACKAGES)
						]
					}
				]
			},
			...packageSidebars(PACKAGES),
		},

		editLink: {
			pattern: "https://github.com/prozilla-os/ProzillaOS/edit/main/docs/src/:path",
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

	ignoreDeadLinks: [
		/^https?:\/\/localhost/
	],

	markdown: {
		theme: {
			dark: "material-theme-palenight",
			light: "material-theme-palenight"
		}
	}
});
