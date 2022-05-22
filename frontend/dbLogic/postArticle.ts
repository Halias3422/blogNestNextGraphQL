import { gql } from '@apollo/client';
import { SyntheticEvent } from 'react';
import { apiClient } from '../pages/_app';
import { Article, ArticleForm } from '../types/article';
import { CurrProfile } from '../types/currProfile';

export const storeNewArticleDataFromForm = async (
	event: SyntheticEvent,
	articleImg: string,
	currProfile: CurrProfile
): Promise<Article> => {
	const target = event.target as typeof event.target & {
		title: { value: string };
		category: { value: string };
		description: { value: string };
		articleContent: { value: string };
	};
	const articleData: ArticleForm = {
		authorID: currProfile.id,
		title: target.title.value,
		description: target.description.value,
		category: target.category.value,
		image: articleImg,
		content: target.articleContent.value,
		createdAt: new Date()
	};
	return await registerNewArticleToDB(articleData);
};

const registerNewArticleToDB = async (
	articleData: ArticleForm
): Promise<Article> => {
	try {
		const { data } = await apiClient.mutate({
			mutation: gql`
				mutation createNewArticle(
					$newArticle: ArticleCreationPublicInput!
				) {
					createNewArticle(newArticle: $newArticle) {
						id
					}
				}
			`,
			variables: {
				newArticle: {
					title: articleData.title,
					description: articleData.description,
					content: articleData.content,
					image: articleData.image,
					category: articleData.category,
					authorId: articleData.authorID
				}
			}
		});
		return data.createNewArticle as Article;
	} catch (e) {
		return <Article>{};
	}
};
