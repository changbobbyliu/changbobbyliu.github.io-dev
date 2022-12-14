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
	portfolio: `
		query portfolios($preview: Boolean) {
			portfolioCollection(preview: $preview) {
				items {
					sys { id }
					name
					description
					techs
					url
					previewImage { url }
					categoriesCollection {
						items { name }
					}
				}
			}
			portfolioCategoryCollection(preview: $preview) {
				items {
					name
				}
			}
		}
	`,
};

export type TGQL = {
	topicProductCollection: NSDTO.TMyTopic[];
	portfolio: {
		portfolioCollection: NSDTO.TPortfolio[];
		portfolioCategoryCollection: NSDTO.TPortfolioCategory[];
	};
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

	async get(query: keyof TGQL, config: NSChangGlobal.TContentfulCallConfig = {}) {
		const promise = fetch(
			`https://graphql.contentful.com/content/v1/spaces/${
				import.meta.env.VITE_CONTENTFUL_SPACE_ID
			}/environments/${config.env ?? "master"}`,
			this.getClientConfig(config.isPreview || false)(gql[query])
		)
			.then((res) => res.json())
			.then((res) => res.data);

		if (config.delay) {
			return new Promise<TGQL[typeof query]>((resolve) => {
				setTimeout(() => {
					resolve(promise);
				}, config.delay);
			});
		}
		return promise;
	}

	async getTopicProductCollection(config: NSChangGlobal.TContentfulCallConfig = {}) {
		const promise = this.get("topicProductCollection", config)
			.then((res) => res["topicProductCollection"])
			.then((res) => res.items as NSDTO.TMyTopic[]);

		return promise;
	}

	async getPortfolio(config: NSChangGlobal.TContentfulCallConfig = {}) {
		return this.get("portfolio", config).then((res) => ({
			portfolios: res.portfolioCollection.items as NSDTO.TPortfolio[],
			portfolioCategories: res.portfolioCategoryCollection.items as NSDTO.TPortfolioCategory[],
		}));
	}
}
