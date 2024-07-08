import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "ProzillaOS Docs",

	description: "Documentation for ProzillaOS and its packages.",

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
			{ text: "About", link: "/about", activeMatch: "/about/" },
			{ text: "Guides", link: "/guides/getting-started", activeMatch: "/guides/" },
			{ text: "Reference", link: "/reference/configuration", activeMatch: "/reference/" }
		],

		sidebar: {
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
						text: "Reference",
						collapsed: false,
						items: [
							{ text: "Configuration", link: "/configuration" },
						]
					},
					{
						text: "Classes",
						base: "/reference/classes/",
						collapsed: false,
						items: [
							{
								text: "System",
								base: "/reference/classes/system/",
								items: [
									{ text: "AppsConfig", link: "apps-config" },
									{ text: "DesktopConfig", link: "desktop-config" },
									{ text: "TaskbarConfig", link: "taskbar-config" }
								]
							},
						]
					}
				]
			},
			"/about/": {
				base: "/about/",
				items: [
					{ text: "About", link: "/" }
				]
			}
		},

		editLink: {
			pattern: "https://github.com/prozilla-os/ProzillaOS/edit/main/packages/docs/src/:path",
			text: "Edit this page on GitHub"
		},

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
	}
});
