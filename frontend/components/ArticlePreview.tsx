import { Article, singleArticle } from "../types/article";
import styles from '../styles/ArticlePreview.module.css';
import { NextRouter, useRouter } from "next/router";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function ArticlePreview({ article, articleList }:
    { article: Article, articleList: Article[] }) {
    const router: NextRouter = useRouter();
    const [readableDate, setReadableDate] = useState<string>();

    console.log(article.title, article.id);

    useEffect(() => {
        const articleDate = new Date(article.createdAt).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        setReadableDate(articleDate);
    }, [article.createdAt]);

    return (
        <div className={styles.articleContainer} key={article.id} onClick={
            () => 
            router.push({
                pathname: '/article/' + encodeURIComponent(article.title) + article.id,
                query: {
                    article: article.id,
                }
            },
                undefined,
                {
                    shallow: false
                })
        }>
            <div className={styles.textContainer}>
                <h4 className={`${styles.articlePreview} ${styles.articleAuthor}`}>author name</h4>
                <div className={styles.articleText}>
                    <h2 className={styles.articlePreview}>{article.title}</h2>
                    <p className={`${styles.articlePreview} ${styles.description}`}>{article.description}</p>
                </div>
                <h5>{readableDate}</h5>
            </div>
            <div className={styles.imageContainer}>
                <img className={styles.articleImage} src={article.image} alt="" />
            </div>
        </div>
    );
}

export default ArticlePreview;