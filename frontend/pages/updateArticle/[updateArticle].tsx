import { useContext } from 'react';
import ArticleForm from '../../components/ArticleForm';
import Authentificated from '../../components/Authentificated';
import { CurrProfileContext } from '../../context/userContext';
import { retreiveArticleFromId } from '../../dbLogic/retreiveArticles';
import styles from '../../styles/newArticle.module.css';
import { Article } from '../../types/article';
import { apiClient } from '../_app';

export default function UpdateArticle({
	articleToUpdate
}: {
	articleToUpdate: Article;
}) {
	return (
		<>
			<Authentificated currProfile={useContext(CurrProfileContext)[0]} />
			<div className={styles.globalContainer}>
				<h1 className={styles.title}>Edit the article</h1>
				<ArticleForm articleToUpdate={articleToUpdate} />
			</div>
		</>
	);
}

export async function getServerSideProps(context: any) {
	const query = context.query;
	const articleToUpdate: Article = await retreiveArticleFromId(
		query['article'] as string,
		apiClient
	);
	return {
		props: {
			articleToUpdate
		}
	};
}
