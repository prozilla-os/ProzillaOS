export interface Album {
    name: string;
    id: string;
}

export interface Images {
    big: string;
    medium: string;
    small: string;
}

export interface Release {
    date: string;
    year: string; // Ensure this is a string if the data returns it as a string
}

export interface Lyrics {
    plain: string;
    synced: string[];
}

export interface Misc {
    explicit: boolean;
    duration: number; // Duration in milliseconds
    popularity: number;
    url: string;
    preview_url: string | null; // Can be null
    release: Release;
    lyrics: Lyrics;
}

export interface Song {
    id: string; // Unique identifier for the song
    isrc: string; // International Standard Recording Code
    title: string; // Title of the song
    artist: string; // Artist name
    album: Album; // Album details
    images: Images; // Image URLs
    misc: Misc; // Miscellaneous details
}
