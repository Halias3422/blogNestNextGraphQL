import { SyntheticEvent } from 'react';
import { ArticleForm, ArticleUpdateForm } from '../../types/article';
import { CurrProfile } from '../../types/user';

export const fromFormEventToArticleForm = (
	event: SyntheticEvent,
	currProfile: CurrProfile,
	category: string
): ArticleForm => {
	const target = event.target as typeof event.target & {
		title: { value: string };
		description: { value: string };
		image: { value: string };
		content: { value: string };
	};
	const newArticle: ArticleForm = {
		authorId: currProfile.id as string,
		title: target.title.value,
		description: target.description.value,
		category: category,
		image: target.image.value,
		content: target.content.value
	};
	return newArticle;
};
