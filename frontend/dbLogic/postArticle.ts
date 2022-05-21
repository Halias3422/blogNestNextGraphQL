import { SyntheticEvent } from 'react';
import { ArticleForm } from '../types/article';
import { CurrProfile } from '../types/currProfile';

export const storeNewArticleDataFromForm = (
	event: SyntheticEvent,
	articleImg: string,
	currProfile: CurrProfile
) => {
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
	console.log('articleData', articleData);
};
