import { gql } from '@apollo/client';

export const CREATE_NEW_ARTICLE_MUTATION = gql`
	mutation createNewArticle($newArticle: ArticleCreationPublicInput!) {
		createNewArticle(newArticle: $newArticle) {
			title
			id
		}
	}
`;

export const UPDATE_ARTICLE_MUTATION = gql`
	mutation updateArticle($articleToUpdate: ArticleUpdatePublicInput!) {
		updateArticle(articleToUpdate: $articleToUpdate) {
			title
			id
		}
	}
`;
