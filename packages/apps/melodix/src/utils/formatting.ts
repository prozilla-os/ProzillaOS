/**
 * Substitutes duplicate parts of a string separated by a semicolon
 * @example
 * // returns "Test"
 * substituteDuplicates("Test; Test");
 */
function substituteDuplicates(string: string): string {
	return string.replace(/^\s*(.+);\s?\1\s*$/g, "$1");
}

/**
 * Removes excess spaces
 */
function cleanSpaces(string: string): string {
	return string.replace(/\s+/g, " ").trim();
}

export function formatTrackTitle(title: string | null): string | void {
	if (title == null)
		return;

	title = substituteDuplicates(title);

	// Remove version suffix, e.g.: "(Radio edit)"
	title = title.replace(/[([](.*\s+)?(?:(edit(ion)?)|remix|(remaster(ed)?)|cover|rerecorded|version)(\s+.+)?[\])]/gi, "");

	// Remove featured artist suffix, e.g.: "(Feat. Prozilla)"
	title = title.replace(/[([](?:feat((\.|uring)?)|with|ft\.?)\s.+[\])]/gi, "");

	return cleanSpaces(title);
}

export function formatTrackArtist(artist: string | null): string | void {
	if (artist == null)
		return;

	artist = substituteDuplicates(artist);

	const artists = artist.split(/[;+,&|]\s*/g);
	const lastArtist = artists.pop() as string;
	const formattedArtist = artists.length ? `${artists.join(", ")} & ${lastArtist}` : lastArtist;
	return cleanSpaces(formattedArtist);
}