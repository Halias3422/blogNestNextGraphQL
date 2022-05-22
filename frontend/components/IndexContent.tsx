import ArticleList from './ArticleList';
import styles from '../styles/IndexContent.module.css';
import Discover from './Discover';
import { Article } from '../types/article';

function IndexContent({ articleList }: { articleList: Article[] }) {
	return (
		<div className={styles.globalContainer}>
			<ArticleList articleList={articleList} />
			<Discover />
		</div>
	);
}

export default IndexContent;
