import { Article } from "../types/article";
import styles from '../styles/ArticleList.module.css'

function ArticleList({ articleList }: any) {
    const articles: Article[] = articleList
    return (
        <div className={styles.articleListContainer}>
            {articles.map((article) => (
                <div className={styles.articleContainer} key={article.id}>
                    <div className={styles.textContainer}>
                        <h4 className={styles.articlePreview}>author name</h4>
                        <h2 className={styles.articlePreview}>{article.title}</h2>
                        <p className={styles.articlePreview}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Perferendis, optio? Minima ut recusandae magnam molestias,
                            soluta fugit incidunt tenetur, consectetur nobis, ea cupiditate
                            molestiae! Eaque cum cupiditate fugiat modi delectus.
                        </p>
                        <h5 className={styles.articlePreview}>{article.createdAt.toString()}</h5>
                    </div>
                    <div className={styles.imageContainer}>
                        <img className={styles.articleImage} src="https://miro.medium.com/max/1400/1*7gtWe0Tiu2jGPZ4oeNOuOA.png"/>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default ArticleList;