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