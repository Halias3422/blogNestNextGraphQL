import { useQuery } from '@apollo/client';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	styled
} from '@mui/material';
import {
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useEffect,
	useState
} from 'react';
import {
	sortArticleListByCreationDateAsc,
	sortArticleListByCreationDateDesc
} from '../../../pages/api/articleListSort';
import { RETREIVE_ALL_ARTICLES_QUERY } from '../../../pages/api/queries/articlesQueries';
import { Article } from '../../../types/article';
import ArticleIndexPreview from './subComponents/ArticleIndexPreview';

const GlobalContainer = styled('div')({
	flex: '2',
	marginRight: '5%'
});

const SortListSelectContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-end',
	width: '100%'
});

const SortListSelect = styled(Select)({
	width: '200px'
});

const ArticleListIndex = () => {
	const { called, loading, error, data } = useQuery(
		RETREIVE_ALL_ARTICLES_QUERY
	);
	const [articleListSorted, setArticleListSorted]: [
		Article[],
		Dispatch<SetStateAction<Article[]>>
	] = useState([] as Article[]);
	const [articleSortType, setArticleSortType] = useState('');

	const updateArticleListWithScroll = (event: Event) => {
		console.log(event);
	};

	useEffect(() => {
		if (called && !loading && !error && articleListSorted.length == 0) {
			console.log('before', data.findAllArticles);
			setArticleListSorted(
				sortArticleListByCreationDateDesc(data.findAllArticles)
			);
			console.log('after', data.findAllArticles);
		}

		// window.addEventListener('scroll', updateArticleListWithScroll);
	});

	const handleArticleSortChange = (event: SelectChangeEvent<unknown>) => {
		setArticleSortType(event.target.value as string);
		switch (event.target.value as string) {
			case 'creationDateDesc':
				setArticleListSorted(
					sortArticleListByCreationDateDesc(data.findAllArticles)
				);
				break;
			case 'creationDateAsc':
				setArticleListSorted(
					sortArticleListByCreationDateAsc(data.findAllArticles)
				);
				break;
			case 'trending':
				break;
			default:
				break;
		}
	};

	return (
		<GlobalContainer>
			<SortListSelectContainer>
				<FormControl size="small">
					<InputLabel id="listSort">Sort by</InputLabel>
					<SortListSelect
						labelId="listSort"
						label="Sort by"
						value={articleSortType}
						onChange={handleArticleSortChange}
					>
						<MenuItem value={'creationDateDesc'}>
							Creation date desc
						</MenuItem>
						<MenuItem value={'creationDateAsc'}>
							Creation date asc
						</MenuItem>
						<MenuItem value={'trending'}>Trending</MenuItem>
					</SortListSelect>
				</FormControl>
			</SortListSelectContainer>
			{loading || error
				? [...Array(20)].map((x, i) => (
						<ArticleIndexPreview
							loading={loading}
							error={error}
							article={data}
							key={i}
						/>
				  ))
				: articleListSorted.map((article: Article, index: number) => (
						<ArticleIndexPreview
							loading={loading}
							error={error}
							article={article}
							key={index}
						/>
				  ))}
		</GlobalContainer>
	);
};

export default ArticleListIndex;
