import ArticleList from "./ArticleList";
import styles from '../styles/IndexContent.module.css'
import Discover from "./Discover";

function IndexContent( { articleList }: any) {
    return (
        <div className={styles.globalContainer}>
            <ArticleList articleList={articleList} />
            <Discover />
        </div>
    )
}

export default IndexContent;