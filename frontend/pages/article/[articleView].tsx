import { useLazyQuery, useQuery } from '@apollo/client';
import { styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AuthorInfo from '../../components/ArticleView/AuthorInfo';
import EditArticleButton from '../../components/ArticleView/EditArticleButton';
import ArticleViewSidebar from '../../components/ArticleView/Sidebar';
import { Article } from '../../types/article';
import { RETREIVE_ARTICLE_BY_ID_QUERY } from '../api/queries/articlesQueries';

const GlobalContainer = styled('div')({
	width: '70%',
	minWidth: '600px',
	margin: '0 auto',
	height: '1000px',
	display: 'flex'
});

const ArticleViewContainer = styled('div')({
	flex: '2',
	padding: '80px 7% 80px 7%',
	borderLeft: '1px solid lightgrey',
	borderRight: '1px solid lightgrey'
});

const ArticleTitle = styled(Typography)({
	marginTop: '50px',
	fontWeight: 'bold',
	color: '#292929',
	lineHeight: '1',
	textAlign: 'justify'
});

const ArticleDescription = styled(Typography)({
	marginTop: '20px',
	marginBottom: '40px',
	fonWeight: '400',
	color: '#757575',
	lineHeight: '1',
	textAlign: 'justify'
});

const ImageContainer = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	marginBottom: '60px'
});

const ArticleImage = styled('img')({
	maxWidth: '100%',
	margin: '0 auto'
});

const ArticleContent = styled(Typography)({
	textAlign: 'justify',
	fontSize: '15pt',
	lineHeight: '1.2',
	marginBottom: '100px'
});

const ArticleView = () => {
	const router = useRouter();
	const [retreiveArticle, { called, data, loading, error }] = useLazyQuery(
		RETREIVE_ARTICLE_BY_ID_QUERY
	);

	useEffect(() => {
		if (router.query && router.query.id && !called) {
			retreiveArticle({ variables: { articleId: router.query.id } });
		}
	});
	if (called && !loading && !error) {
		const article: Article = data.findOneArticleById;

		return (
			<GlobalContainer>
				<ArticleViewContainer>
					<EditArticleButton article={article} />
					<AuthorInfo article={article} />
					<ArticleTitle variant="h4">{article.title}</ArticleTitle>
					<ArticleDescription variant="h6">
						{article.description}
					</ArticleDescription>
					<ImageContainer>
						<ArticleImage
							src={article.image}
							alt={article.description}
						/>
					</ImageContainer>
					<ArticleContent>{article.content}</ArticleContent>
				</ArticleViewContainer>
				<ArticleViewSidebar author={article.author} />
			</GlobalContainer>
		);
	} else {
		return <></>;
	}
};

export default ArticleView;
