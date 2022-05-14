import { Article } from "../types/article";
import styles from '../styles/ArticleList.module.css';
import { NextRouter, Router, useRouter } from "next/router";
import ArticlePreview from "./ArticlePreview";

function ArticleList({ articleList }: { articleList: Article[] }) {
    const router: NextRouter = useRouter();
    return (
        <div className={styles.articleListContainer}>
            {articleList.map((article: Article) => (
               <ArticlePreview article={article} articleList={articleList} key={article.id}/> 
            ))}
        </div>
    )
}


export default ArticleList;