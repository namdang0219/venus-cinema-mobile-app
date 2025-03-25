export type CampaignType = {
	documentId?: string;
	title: string;
	type: "membership" | "store";
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	poster: {
		id: number;
		name: string;
		uri: string;
	};
};
