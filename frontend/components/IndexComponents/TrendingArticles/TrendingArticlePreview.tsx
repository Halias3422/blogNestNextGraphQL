import {
	Card,
	CardActionArea,
	CircularProgress,
	styled,
	Typography
} from '@mui/material';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { ApolloError } from '@apollo/client';
import { Article } from '../../../types/article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';

const GlobalContainer = styled('div')({
	width: '31%',
	minWidth: '300px',
	height: '120px',
	marginRight: '2%',
	marginBottom: '2%',
	display: 'flex'
});

const OrderTypo = styled(Typography)({
	fontSize: '34px',
	color: '#dddddd',
	fontWeight: 'bolder',
	width: 'fit-content',
	marginRight: '5%'
});

const LoadingPreview = styled('div')({
	flex: 4,
	width: '300px',
	height: '120px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
});

const ArticleAuthor = styled('div')({
	display: 'flex',
	alignItems: 'center'
});

const ArticleTitle = styled(Typography)({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box !important',
	WebkitLineClamp: '2',
	WebkitBoxOrient: 'vertical',
	whiteSpace: 'normal',
	lineHeight: '1.2',
	fontWeight: 'bolder'
});

const CardContainer = styled('div')({
	height: '120px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly'
});

const TrendingArticlePreview = ({
	error,
	loading,
	article,
	order
}: {
	error: ApolloError | undefined;
	loading: boolean;
	article: Article;
	order: number;
}) => {
	const [readableDate, setReadableDate] = useState<String>();
	useEffect(() => {
		if (!loading && !error) {
			const readableDate = new Date(article.createdAt).toLocaleDateString(
				'en-Us',
				{
					month: 'long',
					day: 'numeric'
				}
			);
			setReadableDate(readableDate);
		}
	});
	return (
		<GlobalContainer>
			<OrderTypo>0{order + 1}</OrderTypo>
			{loading ? (
				<LoadingPreview>
					<CircularProgress />
				</LoadingPreview>
			) : error ? (
				<LoadingPreview>
					<BrokenImageIcon fontSize="large" />
					<Typography>Error fetching the article...</Typography>
				</LoadingPreview>
			) : (
				<Card elevation={0} sx={{ borderRadius: '10px' }}>
					<CardActionArea>
						<CardContainer>
							<ArticleAuthor>
								<AccountCircleIcon sx={{ marginRight: '3%' }} />
								<Typography variant="caption" fontWeight="500">
									{article.author.login}
								</Typography>
							</ArticleAuthor>
							<ArticleTitle variant="subtitle1">
								{article.title}
							</ArticleTitle>
							<Typography variant="caption" color={'#757575'}>
								{readableDate}
							</Typography>
						</CardContainer>
					</CardActionArea>
				</Card>
			)}
		</GlobalContainer>
	);
};

export default TrendingArticlePreview;
