import { styled, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingArticlePreview from './TrendingArticlePreview';
import { useQuery } from '@apollo/client';
import { RETREIVE_ALL_ARTICLES_QUERY } from '../../../pages/api/queries/articlesQueries';

const GlobalContainer = styled('div')({
	width: '66%',
	margin: '0 auto',
	marginTop: '40px',
	minWidth: '300px',
	display: 'flex',
	flexDirection: 'column',
	color: '#292929'
});

const TitleContainer = styled('div')({
	display: 'flex',
	alignItems: 'center'
});

const SurroundCircleLogo = styled('div')({
	backgroundColor: 'white',
	height: '20px',
	width: '20px',
	borderRadius: '50%',
	border: '1px black solid',
	marginRight: '3%',
	marginBottom: '5px'
});

const TrendingArticlesContainer = styled('div')({
	display: 'flex',
	flexWrap: 'wrap',
	marginTop: '20px'
});

const BottomLine = styled('div')({
	marginTop: '30px',
	width: '100%',
	border: '1px solid #e6e6e6'
});

const TrendingArticlesGrid = () => {
	const { data, loading, error } = useQuery(RETREIVE_ALL_ARTICLES_QUERY);
	return (
		<>
			<GlobalContainer>
				<TitleContainer>
					<SurroundCircleLogo>
						<TrendingUpIcon fontSize="small" />
					</SurroundCircleLogo>
					<Typography variant="caption" sx={{ fontWeight: '900' }}>
						TRENDING ON NESTNEXT
					</Typography>
				</TitleContainer>
				<TrendingArticlesContainer>
					{[...Array(6)].map((x, i) => (
						<TrendingArticlePreview
							error={error}
							loading={loading}
							article={data?.findAllArticles[i]}
							order={i}
							key={i}
						/>
					))}
				</TrendingArticlesContainer>
			</GlobalContainer>
			<BottomLine />
		</>
	);
};

export default TrendingArticlesGrid;
