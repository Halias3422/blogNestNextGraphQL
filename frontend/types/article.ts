export type Article = {
    id: string,
    title: string,
    content: string,
    createdAt: Date,
    lastUpdatedAt: Date
}

export interface HomeArticle {
    articleList: Article
}