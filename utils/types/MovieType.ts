export type MovieType = {
	documentId?: string;
	title: string;
	description: string;
	poster: {
		name: string;
		uri: string;
	};
	banner: {
		name: string;
		uri: string;
	};
	genres: string[];
	releaseDate: string;
	movie_status: "Coming soon" | "Now showing" | "Finished";
	duration: string;
	language: { name: string };
	casts: string;
	trailer: string;
};
