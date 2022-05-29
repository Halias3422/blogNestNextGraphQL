import { ApolloError } from '@apollo/client';
import {
	styled,
	CircularProgress,
	Typography,
	Card,
	CardActionArea
} from '@mui/material';
import { Article } from '../../../../types/article';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { useEffect, useState } from 'react';
import ArticleContainer from './ArticleContainer';
import { useRouter } from 'next/router';

const ARTICLE_PREVIEW_HEIGHT = '150px';

const LoadingStateContainer = styled('div')({
	display: 'flex',
	height: ARTICLE_PREVIEW_HEIGHT,
	justifyContent: 'center',
	alignItems: 'center'
});

const GlobalContainer = styled('div')({
	width: '100%',
	minWidth: '300px',
	height: ARTICLE_PREVIEW_HEIGHT,
	display: 'flex',
	flexDirection: 'column',
	marginTop: '40px'
});

const CardActionContainer = styled(CardActionArea)({
	width: '100%',
	height: ARTICLE_PREVIEW_HEIGHT
});

const ArticleIndexPreview = ({
	loading,
	error,
	article
}: {
	loading: boolean;
	error: ApolloError | undefined;
	article: Article;
}) => {
	const [readableDate, setReadableDate] = useState<string>();
	const router = useRouter();

	const goToArticlePage = () => {
		router.push({
			pathname: '/article/' + encodeURIComponent(article.title),
			query: { id: article.id }
		});
	};

	useEffect(() => {
		if (!loading && !error) {
			setReadableDate(readableDate);
		}
	});

	return (
		<GlobalContainer>
			<Card
				elevation={0}
				onClick={goToArticlePage}
				sx={{ borderRadius: '0' }}
			>
				<CardActionContainer>
					{loading ? (
						<LoadingStateContainer>
							<CircularProgress />
						</LoadingStateContainer>
					) : error ? (
						<LoadingStateContainer>
							<BrokenImageIcon fontSize="large" />
							<Typography>
								Error fetching the article...
							</Typography>
						</LoadingStateContainer>
					) : (
						<ArticleContainer article={article} />
					)}
				</CardActionContainer>
			</Card>
		</GlobalContainer>
	);
};

export default ArticleIndexPreview;
