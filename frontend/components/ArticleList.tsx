import { Article } from "../types/article";
import styles from '../styles/ArticleList.module.css';
import { NextRouter, Router, useRouter } from "next/router";
import ArticlePreview from "./ArticlePreview";

function ArticleList({ articleList }: { articleList: Article[] }) {
    const router: NextRouter = useRouter();
    const articleFetched: boolean = articleList && articleList.length ? true : false;
    return (
        <div className={styles.articleListContainer}>
            {articleFetched ? articleList.map((article: Article) => (
               <ArticlePreview article={article} articleList={articleList} key={article.id}/> 
            )) : <></>}
        </div>
    )
}


export default ArticleList;