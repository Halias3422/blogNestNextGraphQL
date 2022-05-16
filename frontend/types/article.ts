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