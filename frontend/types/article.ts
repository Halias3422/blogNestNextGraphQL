export type Article = {
    id: string,
    title: string,
    description: string,
    image: string,
    content: string,
    createdAt: Date,
    lastUpdatedAt: Date
}

export interface singleArticle  {
    registeredArticle: Article
}

export interface HomeArticle {
    articleList: Article
}

export type ArticleForm = {
    authorID: string | null,
    title: string,
    description: string,
    category: string,
    image: string,
    content: string,
    createdAt: Date,

}