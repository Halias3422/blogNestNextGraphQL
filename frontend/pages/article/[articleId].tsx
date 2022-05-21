import { Article } from '../../types/article';
import styles from '../../styles/ArticleView.module.css';
import ArticleList from '../../components/ArticleList';
import { apiClient } from '../_app';
import {
	retreiveAllArticlesFromDB,
	retreiveArticleFromId
} from '../../dbLogic/retreiveArticles';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ArticleView({
	article,
	articleList
}: {
	article: Article;
	articleList: Article[];
}) {
	const [readableDate, setReadableDate] = useState<string>();
	const router = useRouter();

	useEffect(() => {
		const articleDate = new Date(article.createdAt).toLocaleDateString(
			'fr-FR',
			{
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric'
			}
		);
		setReadableDate(articleDate);
	}, [article.createdAt]);

	return (
		<div className={styles.globalContainer}>
			<div className={styles.articleContainer}>
				<div className={styles.articleAuthorContainer}>
					<h4>Written by {article.author.login}</h4>
					<p>{'created: ' + readableDate}</p>
				</div>
				<div className={styles.articleContentContainer}>
					<h1 className={styles.articleTitle}>{article.title}</h1>
					<img
						className={styles.articleImg}
						src={article.image}
					></img>
					<p className={styles.articleDescription}>
						{article.description}
					</p>
					<p className={styles.articleContent}>{article.content}</p>
				</div>
			</div>
			<div className={styles.sideContainer}>
				<div className={styles.sideAuthorInfo}></div>
				<div className={styles.sideArticleList}>
					<h3>More from blog NestNext</h3>
					<ArticleList
						articleList={selectFourFirstArticles(articleList)}
					/>
				</div>
			</div>
		</div>
	);
}

function selectFourFirstArticles(articleList: Article[]): Article[] {
	const shortArticleList: Article[] = [];
	for (let x = 0; x < 4; x++) {
		shortArticleList.push(articleList[x]);
	}
	return shortArticleList;
}

export async function getServerSideProps(context: any) {
	const query = context.query;
	const article: Article = await retreiveArticleFromId(
		query['article'] as string,
		apiClient
	);
	const articleList: Article[] = await retreiveAllArticlesFromDB(apiClient);
	return {
		props: {
			article,
			articleList
		}
	};
}

export default ArticleView;
