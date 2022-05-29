import { styled, Typography } from '@mui/material';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { ArticleForm } from '../../types/article';
import { CurrProfileContext } from '../_app';
import { CREATE_NEW_ARTICLE_MUTATION } from '../api/mutations/articlesMutations';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import ArticleFormContent from '../../components/NewArticle/ArticleFormContent';
import { fromFormEventToArticleForm } from '../api/fromFormEventToArticleForm';

const GlobalContainer = styled('div')({
	maxWidth: '66%',
	margin: '0 auto',
	border: '1px solid #757575',
	minHeight: '1000px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	paddingTop: '100px'
});

const NewArticleForm = styled('form')({
	width: '80%',
	marginTop: '50px',
	marginBottom: '200px'
});
const NewArticle = () => {
	const [category, setCategory] = useState('');
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
	const [createNewArticle, { data, called, loading, error }] = useMutation(
		CREATE_NEW_ARTICLE_MUTATION
	);
	const [errorSubmit, setErrorSubmit] = useState('');
	const router = useRouter();

	const handleFormSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		const newArticle = fromFormEventToArticleForm(
			event,
			currProfile,
			category
		);
		await createNewArticle({ variables: { newArticle: newArticle } }).catch(
			() => {
				setErrorSubmit("Error: couldn't register the article.");
			}
		);
	};

	useEffect(() => {
		if (called && !loading && !error) {
			router.push({
				pathname:
					'/article/' +
					encodeURIComponent(data.createNewArticle.title),
				query: { id: data.createNewArticle.id }
			});
		}
	});

	return (
		<GlobalContainer>
			<Typography variant="h2" fontWeight="400">
				Write a new article.
			</Typography>
			<NewArticleForm onSubmit={handleFormSubmit}>
				<ArticleFormContent
					errorSubmit={errorSubmit}
					category={category}
					setCategory={setCategory}
					articleToUpdate={null}
				/>
			</NewArticleForm>
		</GlobalContainer>
	);
};

export default NewArticle;
