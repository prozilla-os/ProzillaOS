import type { AppsConfig } from "@prozilla-os/core";
import { Logger } from "@prozilla-os/shared";
import type { OutputBundle, PluginContext, Plugin } from "rollup";

export interface StageOptions {
	appsConfig: AppsConfig;

	/**
	 * Favicon of the website.
	 */
	favicon: string;

	/**
	 * Name of the website.
	 * @example "ProzillaOS"
	 */
	siteName: string;

	/**
	 * Tag line of the website.
	 * @example "Web-based Operating System"
	*/
	siteTagLine: string;

	/**
	 * Domain of the live website.
	 * 
	 * A CNAME file will be generated with this value.
	 * @example "os.prozilla.dev"
	 */
	domain: string;

	/**
	 * Array of image URLs that will be added to the sitemap.
	 */
	imageUrls?: string[];
}

interface StageOptionsExtended extends StageOptions {
	imageUrls: string[];
	baseUrl: string;
	paths: FilePaths;
}

interface FilePaths {
	sitemapXml: string;
	robotsTxt: string;
	indexHtml: string;
	cname: string;
}

const logger = new Logger();

function normalizeLineEndings(text: string) {
	return text.replace(/\r\n/g, "\n");
}

function generateSitemapXml(options: StageOptionsExtended) {
	const { imageUrls, appsConfig, baseUrl } = options;

	const date = new Date();

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const monthString = month >= 10 ? month.toString() : "0" + month;
	const dayString = day >= 10 ? day.toString() : "0" + day;

	const lastModified = `${year}-${monthString}-${dayString}`;

	const images = imageUrls.map((path) => `
		<image:image>
			<image:loc>${baseUrl.slice(0, -1) + path}</image:loc>
		</image:image>`
	);

	const pages = appsConfig.apps.map(({ id }) => `
	<url>
		<loc>${baseUrl + id}</loc>
		<lastmod>${lastModified}</lastmod>
	</url>`
	);

	const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xml>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
	<url>
		<loc>${baseUrl}</loc>
		<lastmod>${lastModified}</lastmod>
		${images.join("")}
	</url>
	${pages.join("")}
</urlset>`;

	return normalizeLineEndings(sitemap.trim());
}

function generateRobotsTxt(options: StageOptionsExtended) {
	const { baseUrl } = options;

	return normalizeLineEndings(`# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
Sitemap: ${baseUrl}sitemap.xml`);
}

function generateCname(options: StageOptionsExtended) {
	return options.domain;
}

function generateTemplate(html: string, options: StageOptionsExtended) {
	const { baseUrl } = options;

	const baseUrlRegex = /(?<=")https?:\/\/[a-z0-9-]+(\.)([a-zA-Z0-9-]+(\.))*[a-z]{2,3}\/(?=.*")/gi;
	html = html.replaceAll(baseUrlRegex, baseUrl);

	const commentsRegex = /<!--.*?-->/g;
	html = html.replaceAll(commentsRegex, "");

	const emptyLinesRegex = /^\s*$\n/gm;
	html = html.replaceAll(emptyLinesRegex, "");

	return normalizeLineEndings(html);
}

/**
 * To avoid GitHub pages rendering certain pages that are only defined by React router as a 404 page, 
 * we copy the content of our index file to the 404 page, letting React router properly handle routing on every page.
 */
function generate404Page(context: PluginContext, template: string) {
	context.emitFile({
		type: "asset",
		fileName: "404.html",
		source: template,
	});
}

/**
 * Add an HTML file for every app page so they can be properly crawled and indexed.
 */
function generateAppPages(context: PluginContext, template: string, options: StageOptionsExtended) {
	const { appsConfig, favicon, siteName, siteTagLine, baseUrl } = options;

	for (const app of appsConfig.apps) {
		const appId = app.id;
		const appName = app.name;
		const appDescription = app.description ?? siteTagLine;
		const appIcon = app.iconUrl ?? favicon;

		if (appId === "index") {
			logger.error(`Invalid app ID found: ${appId}`);
			return;
		}

		let html = template;
		
		const titleRegex = /(?<=(<title>|<meta property="og:title" content="|<meta name="twitter:title" content="))(([a-zA-Z|-]|\s)+)(?=(<\/title>|"\/?>))/g;
		html = html.replaceAll(titleRegex, `${appName} | ${siteName}`);

		const descriptionRegex = /(?<=(<meta name="description" content="|<meta property="og:description" content="|<meta name="twitter:description" content="))(([a-zA-Z-.]|\s)+)(?=("\/?>))/g;
		html = html.replaceAll(descriptionRegex, appDescription);

		const canonicalRegex = /(?<=(<link rel="canonical" href="|<meta name="twitter:url" content="|<meta property="og:url" content="))(http(s)?:\/\/[a-zA-Z-.]+\/)(?=("\/?>))/g;
		html = html.replaceAll(canonicalRegex, baseUrl + appId);

		const iconRegex = /(?<=<link [^>]*rel="(apple-touch-)?icon" [^>]*href=")[^"]+(?="[^>]*>)/g;
		html = html.replaceAll(iconRegex, `${appIcon}?x=${Math.round(Date.now() / 3_600_000)}`);

		const faqRegex = /(<!-- FAQ -->.*?)?<script type="application\/ld\+json">.*?<\/script>/gs;
		html = html.replaceAll(faqRegex, "");

		context.emitFile({
			type: "asset",
			fileName: `${appId}.html`,
			source: html,
		});
	}
}

function stageSite(context: PluginContext, bundle: OutputBundle, { appsConfig, favicon, siteName, siteTagLine, domain, imageUrls = [] }: StageOptions) {
	try {
		logger.pending("Staging build...");

		const baseUrl = `https://${domain}/`;

		const paths: FilePaths = {
			sitemapXml: "sitemap.xml",
			robotsTxt: "robots.txt",
			indexHtml: "index.html",
			cname: "CNAME",
		};
	
		const files: [string, (options: StageOptionsExtended) => string][] = [
			[paths.sitemapXml, generateSitemapXml],
			[paths.robotsTxt, generateRobotsTxt],
			[paths.cname, generateCname],
		];

		const extendedOptions = {
			appsConfig,
			favicon,
			siteName,
			siteTagLine,
			domain,
			baseUrl,
			imageUrls,
			paths,
		};
	
		files.forEach(([path, generateContent]) => {
			context.emitFile({
				type: "asset",
				fileName: path,
				source: generateContent(extendedOptions),
			});
		});

		const html = bundle["index.html"];
		if (html && html.type == "asset") {
			const template = generateTemplate(html.source as string, extendedOptions);

			context.emitFile({
				type: "asset",
				fileName: "index.html",
				source: template, 
			});
	
			generate404Page(context, template);
			generateAppPages(context, template, extendedOptions);
		}
	
		logger.success("Staging complete");
	} catch (error) {
		logger.error(error).error("Staging failed");
		process.exit(1);
	}
}

export function stageSitePlugin(options: StageOptions): Plugin {
	return {
		name: "vite-plugin-stage-site",
		generateBundle(_outputOptions, bundle) {
			stageSite(this, bundle, options);
		},
	};
}