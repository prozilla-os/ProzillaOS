import { APPS } from "../config/apps.config";
import { BASE_URL } from "../config/branding.config";
import { WALLPAPERS } from "../config/desktop.config";
import fs from "node:fs";

const PATH_TO_SITEMAP = "public/sitemap.xml";

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

try {
	fs.writeFileSync(PATH_TO_SITEMAP, generateSitemap());
	console.log("Succesfully updated sitemap.xml");
} catch (error) {
	console.error(error);
}