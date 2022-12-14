const gql = {
	topicProductCollection: `
    query topicProductCollection($preview: Boolean) {
      topicProductCollection(preview: $preview) {
        items {
          sys { id }
          name
          featuredImage { url }
        }
      }
    }
  `,
};

export type TGQL = {
	topicProductCollection: NSDTO.TMyTopic[];
};

export class ContentfulService {
	// Singleton
	private static instance: ContentfulService;
	private constructor() {}
	static getInstance() {
		if (!ContentfulService.instance) {
			ContentfulService.instance = new ContentfulService();
		}
		return ContentfulService.instance;
	}

	private getClientConfig(isPreview?: boolean) {
		return (query: string) => ({
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					isPreview
						? import.meta.env.VITE_CONTENTFUL_CPA_TOKEN
						: import.meta.env.VITE_CONTENTFUL_CDA_TOKEN
				}`,
			},
			body: JSON.stringify({
				query,
				variables: { preview: isPreview },
			}),
		});
	}

	async get(
		query: keyof TGQL,
		config: { isPreview?: boolean; env?: "master" | "dev"; delay?: number } = {}
	) {
		const promise: Promise<TGQL[typeof query]> = fetch(
			`https://graphql.contentful.com/content/v1/spaces/${
				import.meta.env.VITE_CONTENTFUL_SPACE_ID
			}/environments/${config.env ?? "master"}`,
			this.getClientConfig(config.isPreview || false)(gql[query])
		)
			.then((res) => res.json())
			.then((res) => res.data)
			.then((res) => res[query])
			.then((res) => res.items);

		if (config.delay) {
			return new Promise<TGQL[typeof query]>((resolve) => {
				setTimeout(() => {
					resolve(promise);
				}, config.delay);
			});
		}
		return promise;
	}
}
