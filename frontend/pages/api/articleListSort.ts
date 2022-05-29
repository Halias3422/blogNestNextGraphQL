import { Article } from '../../types/article';

export const sortArticleListByCreationDateDesc = (articleList: Article[]) => {
	const tmpList = [...articleList];
	const newSortedList = tmpList.sort(
		(articleA, articleB) =>
			new Date(articleB.createdAt).getTime() -
			new Date(articleA.createdAt).getTime()
	);
	return newSortedList;
};

export const sortArticleListByCreationDateAsc = (articleList: Article[]) => {
	const tmpList = [...articleList];
	const newSortedList = tmpList.sort(
		(articleA, articleB) =>
			new Date(articleA.createdAt).getTime() -
			new Date(articleB.createdAt).getTime()
	);
	return newSortedList;
};
