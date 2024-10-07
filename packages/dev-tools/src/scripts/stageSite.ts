import fs from "node:fs";
import type { AppsConfig } from "@prozilla-os/core";
import { resolve } from "node:path";
import { print } from "../features/console";

export interface StageOptions {
	appsConfig: AppsConfig;

	/**
	 * Name of the website 
	 * @example "ProzillaOS"
	 */
	siteName: string;

	/**
	 * Tag line of the website
	 * @example "Web-based Operating System"
	*/
	siteTagLine: string;

	/** Path to the build directory */
	buildPath: string;

	/**
	 * Domain of the live website
	 * 
	 * A CNAME file will be generated with this value
	 * @example "os.prozilla.dev"
	 */
	domain: string;

	/**
	 * Array of image URLs that will be added to the sitemap
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

function normalizeLineEndings(text: string) {
	return text.replace(/\r\n/g, "\n");
}

function generateSitemapXml(options: StageOptionsExtended) {
	const { imageUrls, appsConfig, baseUrl } = options;

	const date = new Date();
	const lastModified = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

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
	const { baseUrl, buildPath } = options;

	const baseUrlRegex = /(?<=")https?:\/\/[a-z0-9-]+(\.)([a-zA-Z0-9-]+(\.))*[a-z]{2,3}\/(?=.*")/gi;
	html = html.replaceAll(baseUrlRegex, baseUrl);

	const commentsRegex = /<!--.*?-->/g;
	html = html.replaceAll(commentsRegex, "");

	const emptyLinesRegex = /^\s*$\n/gm;
	html = html.replaceAll(emptyLinesRegex, "");

	const path = resolve(buildPath, "/index.html");
	fs.writeFileSync(path, html, { flag: "w+" });
	print(path, "file");

	return normalizeLineEndings(html);
}

/**
 * To avoid GitHub pages rendering certain pages that are only defined by React router as a 404 page,
 * we copy the content of our index file to the 404 page, letting React router properly handle routing on every page 
 */
function generate404Page(template: string, options: StageOptionsExtended) {
	const { buildPath } = options;

	const path = resolve(buildPath, "/404.html");
	fs.writeFileSync(path, template, { flag: "w+" });
	print(path, "file");
}

/**
 * Add an HTML file for every app page so they can be properly crawled and indexed
 */
function generateAppPages(template: string, options: StageOptionsExtended) {
	const { appsConfig, siteName, siteTagLine, baseUrl, buildPath } = options;

	for (const app of appsConfig.apps) {
		const appId = app.id;
		const appName = app.name;
		const appDescription = app.description ?? siteTagLine;

		if (appId === "index") {
			print("Invalid app ID found: " + appId, "error");
			return;
		}

		let html = template;
		
		const titleRegex = /(?<=(<title>|<meta property="og:title" content="|<meta name="twitter:title" content="))(([a-zA-Z|-]|\s)+)(?=(<\/title>|"\/?>))/g;
		html = html.replaceAll(titleRegex, `${appName} | ${siteName}`);

		const descriptionRegex = /(?<=(<meta name="description" content="|<meta property="og:description" content="|<meta name="twitter:description" content="))(([a-zA-Z-.]|\s)+)(?=("\/?>))/g;
		html = html.replaceAll(descriptionRegex, appDescription);

		const canonicalRegex = /(?<=(<link rel="canonical" href="|<meta name="twitter:url" content="|<meta property="og:url" content="))(http(s)?:\/\/[a-zA-Z-.]+\/)(?=("\/?>))/g;
		html = html.replaceAll(canonicalRegex, baseUrl + appId);

		const faqRegex = /<!-- FAQ -->.*?<script type="application\/ld\+json">.*?<\/script>/gs;
		html = html.replaceAll(faqRegex, "");

		const path = resolve(buildPath, `/${appId}.html`);
		fs.writeFileSync(path, html, { flag: "w+" });
		print(path, "file");
	}
}

export function stage({ appsConfig, siteName, siteTagLine, buildPath, domain, imageUrls = [] }: StageOptions) {
	try {
		print("Staging build...", "start", true);

		const baseUrl = `https://${domain}/`;

		const paths: FilePaths = {
			sitemapXml: resolve(buildPath, "/sitemap.xml"),
			robotsTxt: resolve(buildPath, "/robots.txt"),
			indexHtml: resolve(buildPath, "/index.html"),
			cname: resolve(buildPath, "/CNAME"),
		};
	
		const files: [string, (options: StageOptionsExtended) => string][] = [
			[paths.sitemapXml, generateSitemapXml],
			[paths.robotsTxt, generateRobotsTxt],
			[paths.cname, generateCname],
		];

		const extendedOptions = {
			appsConfig,
			siteName,
			siteTagLine,
			buildPath,
			domain,
			baseUrl,
			imageUrls,
			paths
		};
	
		files.forEach(([path, generateContent]) => {
			const directory = path.substring(0, path.lastIndexOf("/"));
			if (directory != "" && !fs.existsSync(directory))
				fs.mkdirSync(directory, { recursive: true });
	
			fs.writeFileSync(path, generateContent(extendedOptions), { flag: "w+" });
			print(path, "file");
		});

		print("Generating pages...", "start", true);
	
		const html = fs.readFileSync(paths.indexHtml, "utf-8");
		const template = generateTemplate(html, extendedOptions);
	
		generate404Page(template, extendedOptions);
		generateAppPages(template, extendedOptions);
	
		print("Staging complete", "success", true);
	} catch (error) {
		console.error(error);
		print("Staging failed", "error");
		process.exit(1);
	}
}