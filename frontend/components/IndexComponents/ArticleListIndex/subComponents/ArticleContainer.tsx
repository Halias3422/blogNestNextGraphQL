import { styled, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Article } from '../../../../types/article';

const ARTICLE_PREVIEW_HEIGHT = '150px';

const ArticleContentContainer = styled('div')({
	display: 'flex',
	width: '100%',
	height: ARTICLE_PREVIEW_HEIGHT
});

const ArticleTextContainer = styled('div')({
	width: '100%',
	height: ARTICLE_PREVIEW_HEIGHT,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between'
});

const AuthorInfoContainer = styled('div')({
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
	fontWeight: 'bolder',
	lineHeight: '1.2',
	fontSize: '22px'
});

const ArticleDescription = styled(Typography)({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box !important',
	WebkitLineClamp: '2',
	WebkitBoxOrient: 'vertical',
	whiteSpace: 'normal',
	lineHeight: '1.2',
	color: '#838383',
	fontSize: '16px'
});

const ArticleImage = styled('img')({
	width: '200px',
	height: ARTICLE_PREVIEW_HEIGHT,
	objectFit: 'cover'
});
const ArticleContainer = ({ article }: { article: Article }) => {
	const readableDate = new Date(article.createdAt).toLocaleDateString(
		'en-US',
		{
			month: 'long',
			day: 'numeric'
		}
	);

	return (
		<ArticleContentContainer>
			<ArticleTextContainer>
				<AuthorInfoContainer>
					<AccountCircleIcon sx={{ marginRight: '3%' }} />
					<Typography variant="caption" fontWeight="bolder">
						{article.author.login}
					</Typography>
				</AuthorInfoContainer>
				<ArticleTitle>{article.title}</ArticleTitle>
				<ArticleDescription variant="body1">
					{article.description}
				</ArticleDescription>
				<Typography variant="subtitle2" color="#838383">
					{readableDate}
				</Typography>
			</ArticleTextContainer>
			<ArticleImage src={article.image} alt={article.description} />
		</ArticleContentContainer>
	);
};

export default ArticleContainer;
