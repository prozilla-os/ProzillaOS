import fs from "node:fs";
import { APP_DESCRIPTIONS, APP_NAMES, APPS } from "../config/apps.config";
import { ANSI } from "../config/apps/terminal.config";
import { BASE_URL, NAME, TAG_LINE } from "../config/branding.config";
import { WALLPAPERS } from "../config/desktop.config";

const PATH_TO_SITEMAP = "dist/sitemap.xml";
const PATH_TO_PAGES = "tmp/pages.csv";
const PATH_TO_INDEX = "dist/index.html";
const PATH_TO_TEMPLATE = "tmp/template.html";

function generateSitemap() {
	const date = new Date();
	const lastModified = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	const images = WALLPAPERS.map((path) => `
		<image:image>
			<image:loc>${BASE_URL.slice(0, -1) + path}</image:loc>
		</image:image>`
	);

	const pages = Object.values(APPS).map((appId) => `
	<url>
		<loc>${BASE_URL + appId}</loc>
		<lastmod>${lastModified}</lastmod>
	</url>`
	);

	const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xml>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
	<url>
		<loc>${BASE_URL}</loc>
		<lastmod>${lastModified}</lastmod>
		${images.join("")}
	</url>
	${pages.join("")}
</urlset>`;

	return sitemap.trim();
}

function generatePageRecords() {
	const records = ["id;name;description"];

	for (const [key, value] of Object.entries(APPS)) {
		const id = value;
		const name = (Object.keys(APP_NAMES).includes(key) ? APP_NAMES[key] : id) as string;
		const description = (Object.keys(APP_DESCRIPTIONS).includes(key) ? APP_DESCRIPTIONS[key] : TAG_LINE) as string;

		records.push(`${id};${name};${description}`);
	}

	return records.join("\n") + "\n";
}

function generatePageTemplate() {
	let html = fs.readFileSync(PATH_TO_INDEX, "utf-8");

	const titleRegex = /(?<=(<title>|<meta property="og:title" content="|<meta name="twitter:title" content="))(([a-zA-Z|-]|\s)+)(?=(<\/title>|"\/?>))/g;
	html = html.replaceAll(titleRegex, `_APP_NAME | ${NAME}`);

	const descriptionRegex = /(?<=(<meta name="description" content="|<meta property="og:description" content="|<meta name="twitter:description" content="))(([a-zA-Z-.]|\s)+)(?=("\/?>))/g;
	html = html.replaceAll(descriptionRegex, "_APP_DESCRIPTION");

	const canonicalRegex = /(?<=(<link rel="canonical" href="|<meta name="twitter:url" content="|<meta property="og:url" content="))(http(s)?:\/\/[a-zA-Z-.]+\/)(?=("\/?>))/g;
	html = html.replaceAll(canonicalRegex, `${BASE_URL}_APP_ID`);

	const faqRegex = /<!-- FAQ -->.*?<script type="application\/ld\+json">.*?<\/script>/gs;
	html = html.replaceAll(faqRegex, "");

	return html;
}

try {
	const steps: [string, () => string][] = [
		[PATH_TO_SITEMAP, generateSitemap],
		[PATH_TO_TEMPLATE, generatePageTemplate],
		[PATH_TO_PAGES, generatePageRecords],
	];

	steps.forEach(([path, generateContent]) => {
		const directory = path.substring(0, path.lastIndexOf("/"));
		if (directory != "" && !fs.existsSync(directory)){
			fs.mkdirSync(directory, { recursive: true });
		}

		fs.writeFileSync(path, generateContent(), { flag: "w+" });
		console.log(`${ANSI.fg.green}✓ Generated ${path}${ANSI.reset}`);
	});
} catch (error) {
	console.error(error);
}