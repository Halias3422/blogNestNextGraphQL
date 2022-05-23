import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';
import { useContext } from 'react';
import ArticleForm from '../components/ArticleForm';
import Authentificated from '../components/Authentificated';
import {
	ArticlePostedContext,
	ArticlePostSuccessfulContext
} from '../context/articlePostContext';
import { CurrProfileContext } from '../context/userContext';
import { storeNewArticleDataFromForm } from '../dbLogic/postArticle';
import styles from '../styles/newArticle.module.css';
import { Article } from '../types/article';

function NewArticle() {
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
	const [articlePosted, setArticlePosted] = useState(false);
	const [articlePostSuccessful, setArticlePostSuccessful] = useState(false);
	const router = useRouter();

	console.log('articlePosted', articlePosted);
	const handleArticleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		setArticlePosted(true);
		const articleImg = (
			document.getElementById('articleImg') as HTMLImageElement
		).src;
		const newArticle: Article = await storeNewArticleDataFromForm(
			event,
			articleImg,
			currProfile
		);
		if (newArticle && newArticle.id) {
			setArticlePostSuccessful(true);
			router.push({
				pathname:
					'/article/' +
					encodeURIComponent(newArticle.title) +
					newArticle.id,
				query: { article: newArticle.id }
			});
		}
	};

	return (
		<>
			<Authentificated currProfile={useContext(CurrProfileContext)[0]} />
			<div className={styles.globalContainer}>
				<h1 className={styles.title}>Write a new article</h1>
				<form
					className={styles.articleForm}
					onSubmit={handleArticleSubmit}
				>
					<ArticlePostSuccessfulContext.Provider
						value={[
							articlePostSuccessful,
							setArticlePostSuccessful
						]}
					>
						<ArticlePostedContext.Provider
							value={[articlePosted, setArticlePosted]}
						>
							<ArticleForm articleToUpdate={{} as Article} />
						</ArticlePostedContext.Provider>
					</ArticlePostSuccessfulContext.Provider>
				</form>
			</div>
		</>
	);
}

export default NewArticle;
