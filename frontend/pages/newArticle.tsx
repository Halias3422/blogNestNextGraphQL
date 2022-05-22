import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ChangeEvent, SyntheticEvent, useContext } from 'react';
import { CurrProfileContext } from '../context/userContext';
import { storeNewArticleDataFromForm } from '../dbLogic/postArticle';
import styles from '../styles/newArticle.module.css';
import { Article } from '../types/article';

function NewArticle() {
	let articleImg: string;
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
	const [articlePosted, setArticlePosted] = useState(false);
	const [articlePostSuccessful, setArticlePostSuccessful] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (currProfile.isLoggedIn === false) {
			router.push('/');
		}
	}, [currProfile]);

	const previewImage = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target || !event.target.value) {
			return;
		}
		const image: HTMLImageElement = document.getElementById('articleImg')
			? (document.getElementById('articleImg') as HTMLImageElement)
			: document.createElement('img');
		image.id = 'articleImg';
		image.src = event.target.value;
		articleImg = image.src;
		image.style.maxWidth = '100%';
		document.getElementById('imageContainer')?.appendChild(image);
	};

	const handleArticleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		setArticlePosted(true);
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
		<div className={styles.globalContainer}>
			<form className={styles.articleForm} onSubmit={handleArticleSubmit}>
				<h1 className={styles.title}>Write a new article</h1>
				<div
					className={`${styles.divContainer} ${styles.detailsContainer}`}
				>
					<label htmlFor="title">Article title</label>
					<input
						type="text"
						id="title"
						className={styles.input}
						required
					></input>
					<label htmlFor="category">Category</label>
					<select id="category" className={styles.input} required>
						<option label=""></option>
						<option value="placeholder1">placeholder1</option>
						<option value="placeholder2">placeholder2</option>
						<option value="placeholder3">placeholder3</option>
						<option value="placeholder4">placeholder4</option>
					</select>
					<div
						className={styles.imageSelectionContainer}
						id="imageContainer"
					>
						<label htmlFor="image">Image </label>
						<input
							type="url"
							id="image"
							className={styles.imageUrl}
							onChange={previewImage}
							required
						></input>
					</div>
					<label htmlFor="description">Description</label>
					<input
						type="text"
						id="description"
						className={styles.input}
						required
					></input>
				</div>
				<div
					className={`${styles.divContainer} ${styles.articleContentContainer}`}
				>
					<label htmlFor="articleContent">Article content</label>
					<textarea
						className={`${styles.input} ${styles.articleText}`}
						id="articleContent"
						minLength={10}
						required
					></textarea>
				</div>
				<div className={styles.articleSubmitContainer}>
					<button type="submit" className={styles.button}>
						Publish
					</button>
					<button type="submit" className={styles.button}>
						Cancel
					</button>
				</div>
				<div className={styles.articlePostedStatus}>
					<h4>
						{articlePosted
							? articlePostSuccessful
								? 'The article was successfully published.'
								: 'Error publishing the article, try again later.'
							: ''}
					</h4>
				</div>
			</form>
		</div>
	);
}

export default NewArticle;
