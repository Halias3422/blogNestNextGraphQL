import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { Article } from '../types/article';

export async function retreiveAllArticlesFromDB(
	client: ApolloClient<NormalizedCacheObject>
): Promise<Article[]> {
	try {
		const { data } = await client.query({
			query: gql`
				query findAllArticles {
					findAllArticles {
						id
						title
						description
						content
						image
						author {
							id
							login
						}
						createdAt
						updatedAt
					}
				}
			`
		});
		return data.findAllArticles;
	} catch (error) {
		console.log('Error retreiving articles ', error);
		return [];
	}
}

export async function retreiveArticleFromId(
	id: string,
	client: ApolloClient<NormalizedCacheObject>
): Promise<Article> {
	const { data } = await client.query({
		query: gql`
			query findOneArticle($articleId: ID!) {
				findOneArticleById(id: $articleId) {
					id
					title
					description
					content
					image
					author {
						id
						login
					}
					createdAt
					updatedAt
				}
			}
		`,
		variables: {
			articleId: id
		}
	});
	return data.findOneArticleById;
}
