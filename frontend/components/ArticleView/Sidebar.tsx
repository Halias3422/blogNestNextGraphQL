import {
	InputAdornment,
	OutlinedInput,
	styled,
	TextField,
	Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AccountCircle } from '@mui/icons-material';
import { Author } from '../../types/user';
import { Article } from '../../types/article';
import { RETREIVE_ALL_ARTICLES_QUERY } from '../../pages/api/queries/articlesQueries';
import { useQuery } from '@apollo/client';
import ArticleListIndex from '../IndexComponents/ArticleListIndex/ArticleListIndex';
import ArticleIndexPreview from '../IndexComponents/ArticleListIndex/subComponents/ArticleIndexPreview';

const SidebarContainer = styled('div')({
	flex: '1'
});

const SidebarContent = styled('div')({
	padding: '100px 5% 100px 5%',
	display: 'flex',
	flexDirection: 'column'
});

const SearchInput = styled(OutlinedInput)({
	borderRadius: '25px',
	margin: '0 auto'
});

const AuthorName = styled(Typography)({
	fontWeight: '600',
	marginBottom: '50px',
	marginTop: '50px'
});

const ArticleViewSidebar = ({ author }: { author: Author }) => {
	const { loading, error, data } = useQuery(RETREIVE_ALL_ARTICLES_QUERY);

	return (
		<SidebarContainer>
			<SidebarContent>
				<SearchInput
					size="small"
					fullWidth
					placeholder="Search"
					startAdornment={
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					}
				/>
				{/* Make page load very long */}
				{/* <AccountCircle
					sx={{
						fontSize: '100px',
						margin: '30px 0 20px -6%'
					}}
				/> */}
				<AuthorName>{author.login}</AuthorName>
				<Typography fontWeight="bold">More from NestNext</Typography>
				{loading || error
					? [...Array(10)].map((x, i) => (
							<ArticleIndexPreview
								loading={loading}
								error={error}
								article={data}
								key={i}
							/>
					  ))
					: data.findAllArticles
							.slice(0, 9)
							.map((article: Article, index: number) => (
								<ArticleIndexPreview
									loading={loading}
									error={error}
									article={article}
									key={index}
								/>
							))}
			</SidebarContent>
		</SidebarContainer>
	);
};

export default ArticleViewSidebar;
