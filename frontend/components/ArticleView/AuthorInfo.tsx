import { styled, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Article } from '../../types/article';

const ArticleAuthorGlobalContainer = styled('div')({
	display: 'flex',
	width: '100%',
	justifyContent: 'space-between'
});

const ArticleAuthorLeftContainer = styled('div')({
	flex: '2',
	display: 'flex'
});
const AuthorInfoContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	marginLeft: '3%'
});

const ArticleAuthorRightContainer = styled('div')({
	display: 'flex',
	flex: '1',
	justifyContent: 'flex-end',
	alignItems: 'center'
});

const IconLinksContainer = styled('div')({
	display: 'flex',
	flexWrap: 'nowrap',
	marginRight: '40%'
});

const AuthorProfilePic = styled(AccountCircleIcon)({
	fontSize: '60px'
});

const AuthorInfo = ({ article }: { article: Article }) => {
	const setReadableDate = (date: Date): string => {
		const readableDate = new Date(date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric'
		});
		return readableDate;
	};

	let articleDate = setReadableDate(article.createdAt);
	if (article.createdAt !== article.updatedAt) {
		articleDate += ' (Updated: ' + setReadableDate(article.updatedAt) + ')';
	}

	return (
		<ArticleAuthorGlobalContainer>
			<ArticleAuthorLeftContainer>
				<AuthorProfilePic />
				<AuthorInfoContainer>
					<Typography variant="h6">{article.author.login}</Typography>
					<Typography>{articleDate}</Typography>
				</AuthorInfoContainer>
			</ArticleAuthorLeftContainer>
			<ArticleAuthorRightContainer>
				<IconLinksContainer>
					<TwitterIcon
						fontSize="medium"
						style={{
							color: 'grey',
							marginRight: '5%'
						}}
					/>
					<FacebookIcon
						fontSize="medium"
						style={{
							color: 'grey',
							marginRight: '10%'
						}}
					/>
					<LinkedInIcon
						fontSize="medium"
						style={{
							color: 'grey',
							marginRight: '10%'
						}}
					/>
					<LinkIcon
						fontSize="medium"
						style={{
							color: 'grey',
							marginRight: '10%'
						}}
					/>
				</IconLinksContainer>
				<BookmarkAddIcon fontSize="medium" style={{ color: 'grey' }} />
			</ArticleAuthorRightContainer>
		</ArticleAuthorGlobalContainer>
	);
};

export default AuthorInfo;
