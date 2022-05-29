import { gql } from '@apollo/client';

export const RETREIVE_ALL_ARTICLES_QUERY = gql`
	query findAllArticles {
		findAllArticles {
			id
			title
			description
			content
			image
			category
			author {
				id
				login
			}
			createdAt
			updatedAt
		}
	}
`;

export const RETREIVE_ARTICLE_BY_ID_QUERY = gql`
	query findOneArticleById($articleId: ID!) {
		findOneArticleById(id: $articleId) {
			id
			title
			description
			content
			image
			category
			author {
				id
				login
			}
			createdAt
			updatedAt
		}
	}
`;
