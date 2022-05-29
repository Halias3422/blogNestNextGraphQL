import { useQuery } from '@apollo/client';
import { styled } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RETREIVE_ALL_ARTICLES_QUERY } from '../../../pages/api/queries/articlesQueries';
import { Article } from '../../../types/article';
import ArticleIndexPreview from './subComponents/ArticleIndexPreview';

const GlobalContainer = styled('div')({
	flex: '2',
	marginRight: '5%'
});

const ArticleListIndex = () => {
	const { called, loading, error, data } = useQuery(
		RETREIVE_ALL_ARTICLES_QUERY
	);
	const [articleListSorted, setArticleListSorted]: [
		Article[],
		Dispatch<SetStateAction<Article[]>>
	] = useState([] as Article[]);

	useEffect(() => {
		if (called && !loading && !error && articleListSorted.length == 0) {
			const tmpListSorted = [...data.findAllArticles];
			setArticleListSorted(
				tmpListSorted.sort(
					(articleA, articleB) =>
						new Date(articleB.createdAt).getTime() -
						new Date(articleA.createdAt).getTime()
				)
			);
		}
	});

	return (
		<GlobalContainer>
			{loading || error
				? [...Array(20)].map((x, i) => (
						<ArticleIndexPreview
							loading={loading}
							error={error}
							article={data}
							key={i}
						/>
				  ))
				: articleListSorted.map((article: Article, index: number) => (
						<ArticleIndexPreview
							loading={loading}
							error={error}
							article={article}
							key={index}
						/>
				  ))}
		</GlobalContainer>
	);
};

export default ArticleListIndex;
