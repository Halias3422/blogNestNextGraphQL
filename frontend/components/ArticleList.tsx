import { Article } from '../types/article';
import styles from '../styles/ArticleList.module.css';
import { NextRouter, Router, useRouter } from 'next/router';
import ArticlePreview from './ArticlePreview';
import { useEffect } from 'react';

function ArticleList({ articleList }: { articleList: Article[] }) {
	const router: NextRouter = useRouter();
	const articleFetched: boolean =
		articleList && articleList.length ? true : false;
	const articleListSorted = [...articleList];
	articleListSorted.sort(
		(articleA, articleB) =>
			new Date(articleB.createdAt).getTime() -
			new Date(articleA.createdAt).getTime()
	);

	return (
		<div className={styles.articleListContainer}>
			{articleFetched ? (
				articleListSorted.map((article: Article) => (
					<ArticlePreview
						article={article}
						articleList={articleList}
						key={article.id}
					/>
				))
			) : (
				<></>
			)}
		</div>
	);
}

export default ArticleList;
