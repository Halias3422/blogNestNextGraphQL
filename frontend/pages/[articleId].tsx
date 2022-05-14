import { NextRouter, useRouter } from "next/router";
import { Article } from '../types/article'
import styles from '../styles/ArticleView.module.css'
import { useContext, useEffect } from "react";
import { ParsedUrlQuery } from "querystring";
import ArticleList from "../components/ArticleList";

function ArticleView({ article, articleList }: any) {
    console.log('articleList', articleList);
    return (
        <div className={styles.globalContainer}>
            <div className={styles.articleContainer}>
                <div className={styles.articleAuthorContainer}>
                    <h4>Author name</h4>
                    <p>created: {article.createdAt}</p>
                </div>
                <div className={styles.articleContentContainer}>
                    <h1 className={styles.articleTitle}>{article.title}</h1>
                    <img className={styles.articleImg} src="https://miro.medium.com/max/1400/1*7gtWe0Tiu2jGPZ4oeNOuOA.png"></img>
                    <p className={styles.articleContent}>{article.content}</p>

                </div>
            </div>
            <div className={styles.sideContainer}>
                <div className={styles.sideAuthorInfo}>

                </div>
                <div className={styles.sideArticleList}>
                    <ArticleList articleList={articleList} />
                </div>

            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const query = context.query;
    console.log(query);
    const article: Article = JSON.parse(query['article'] as string);
    const articleList: Article[] = JSON.parse(query['articleList'] as string);
    return {
        props: {
            article,
            articleList
        }
    }
}


export default ArticleView;