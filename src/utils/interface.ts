export interface Artist {
	name: string;
	popularity: number;
	followers: {
		total: number;
	};
	images: Array<{
		url: string;
	}>;
}

export interface PropsArtist {
	artist: Artist[];
}

export interface Playlist {
	collaborative: boolean;
	description: string;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: User;
	primary_color: string | null;
	public: boolean;
	snapshot_id: string;
	tracks: Tracks;
	type: string;
	uri: string;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Image {
	height: number;
	url: string;
	width: number;
}

export interface User {
	display_name: string;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	type: string;
	uri: string;
}

export interface Tracks {
	href: string;
	total: number;
}
