import { ChangeEvent, useContext, useEffect } from 'react';
import {
	ArticlePostedContext,
	ArticlePostSuccessfulContext
} from '../context/articlePostContext';
import styles from '../styles/ArticleForm.module.css';
import { Article } from '../types/article';

export default function ArticleForm({
	articleToUpdate
}: {
	articleToUpdate: Article;
}) {
	let isUpdating = false;
	const [articlePosted, setArticlePosted] = useContext(ArticlePostedContext);
	const [articlePostSuccessful, setArticlePostSuccessful] = useContext(
		ArticlePostSuccessfulContext
	);

	console.log('dans le form articlePosted', articlePosted);
	if (articleToUpdate && articleToUpdate.id) {
		isUpdating = true;
	}

	const previewImage = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target || !event.target.value) {
			return;
		}
		const image: HTMLImageElement = document.getElementById('articleImg')
			? (document.getElementById('articleImg') as HTMLImageElement)
			: document.createElement('img');
		image.id = 'articleImg';
		image.src = event.target.value;
		image.style.maxWidth = '100%';
		document.getElementById('imageContainer')?.appendChild(image);
	};
	return (
		<>
			<div
				className={`${styles.divContainer} ${styles.detailsContainer}`}
			>
				<label htmlFor="title">Article title</label>
				<input
					type="text"
					id="title"
					className={styles.input}
					defaultValue={isUpdating ? articleToUpdate.title : ''}
					required
				></input>
				<label htmlFor="category">Category</label>
				<select
					id="category"
					className={styles.input}
					defaultValue={isUpdating ? articleToUpdate.category : ''}
					required
				>
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
		</>
	);
}
