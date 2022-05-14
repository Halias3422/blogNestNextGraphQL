import { Article } from "../types/article";
import styles from '../styles/ArticlePreview.module.css';
import { NextRouter, useRouter } from "next/router";

function ArticlePreview({ article, articleList }:
     { article: Article, articleList: Article[] }) {
    const router: NextRouter = useRouter();
    return (
        <div className={styles.articleContainer} key={article.id} onClick={
            () => router.push({
                pathname: '/article/' + article.title + article.id,
                query: {
                    article: JSON.stringify(article),
                    articleList: JSON.stringify(articleList)
                }},
                undefined,
                {
                    shallow: true
                })
        }>
            <div className={styles.textContainer}>
                <h4 className={`${styles.articlePreview} ${styles.articleAuthor}`}>author name</h4>
                <div className={styles.articleText}>
                    <h2 className={styles.articlePreview}>{article.title}</h2>
                    <p className={`${styles.articlePreview} ${styles.paraph}`}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Perferendis, optio? Minima ut recusandae magnam molestias,
                        soluta fugit incidunt tenetur, consectetur nobis, ea cupiditate
                        molestiae! Eaque cum cupiditate fugiat modi delectus.
                    </p>
                </div>
                <h5 className={`${styles.articlePreview} ${styles.paraph}`}>{article.createdAt.toString()}</h5>
            </div>
            <div className={styles.imageContainer}>
                <img className={styles.articleImage} src="https://miro.medium.com/max/1400/1*7gtWe0Tiu2jGPZ4oeNOuOA.png" />
            </div>
        </div>
    );
}


export default ArticlePreview;