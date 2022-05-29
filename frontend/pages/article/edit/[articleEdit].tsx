import { useLazyQuery, useMutation } from '@apollo/client';
import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import ArticleFormContent from '../../../components/NewArticle/ArticleFormContent';
import { ArticleUpdateForm } from '../../../types/article';
import { fromFormEventToArticleForm } from '../../api/fromFormEventToArticleForm';
import { UPDATE_ARTICLE_MUTATION } from '../../api/mutations/articlesMutations';
import { RETREIVE_ARTICLE_BY_ID_QUERY } from '../../api/queries/articlesQueries';
import { CurrProfileContext } from '../../_app';

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

const ArticleEdit = () => {
	const [category, setCategory] = useState('');
	const [errorSubmit, setErrorSubmit] = useState('');
	const [
		updateArticle,
		{
			data: mutationData,
			loading: mutationLoading,
			error: mutationError,
			called: mutationCalled
		}
	] = useMutation(UPDATE_ARTICLE_MUTATION, {
		refetchQueries: [RETREIVE_ARTICLE_BY_ID_QUERY, 'findOneArticleById']
	});

	const [articleEditable, setArticleEditable] = useState(false);
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
	const [retreiveArticle, { data, loading, error, called }] = useLazyQuery(
		RETREIVE_ARTICLE_BY_ID_QUERY
	);
	const router = useRouter();

	const checkUserAuthorization = () => {
		if (
			currProfile.login === data.findOneArticleById.author.login &&
			currProfile.id === data.findOneArticleById.author.id &&
			articleEditable === false
		) {
			setArticleEditable(true);
		} else {
			router.push('/');
		}
	};

	const handleFormSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		const newArticle = fromFormEventToArticleForm(
			event,
			currProfile,
			category
		);
		const newUpdatedArticle: ArticleUpdateForm = {
			...newArticle,
			id: data.findOneArticleById.id,
			createdAt: data.findOneArticleById.createdAt,
			updatedAt: new Date()
		};
		await updateArticle({
			variables: { articleToUpdate: newUpdatedArticle }
		}).catch((e) => {
			console.log('ERROOOOOOR', e);
			setErrorSubmit("Error: couldn't update the article");
		});
	};

	useEffect(() => {
		if (router.query && router.query.id && !called) {
			retreiveArticle({ variables: { articleId: router.query.id } });
		}

		if (mutationCalled && !mutationLoading && !mutationError) {
			router.push({
				pathname:
					'/article/' +
					encodeURIComponent(mutationData.updateArticle.title),
				query: { id: mutationData.updateArticle.id }
			});
		}
	});

	if (called && !loading && !error) {
		if (articleEditable === false) {
			checkUserAuthorization();
			setCategory(data.findOneArticleById.category);
		}
		return (
			<GlobalContainer>
				<Typography variant="h2" fontWeight="400">
					Edit your article.
				</Typography>
				<NewArticleForm onSubmit={handleFormSubmit}>
					<ArticleFormContent
						errorSubmit={errorSubmit}
						category={category}
						setCategory={setCategory}
						articleToUpdate={data.findOneArticleById}
					/>
				</NewArticleForm>
			</GlobalContainer>
		);
	} else {
		return <></>;
	}
};

export default ArticleEdit;
