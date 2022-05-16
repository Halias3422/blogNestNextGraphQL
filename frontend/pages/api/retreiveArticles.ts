import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { Article } from "../../types/article";

export async function retreiveAllArticlesFromDB(client: ApolloClient<NormalizedCacheObject>): Promise<Article[]>  {
    const { data } = await client.query({
        query: gql`
            query GetAllArticles {
                returnAllArticles {
                    id
                    title
                    description
                    content
                    image
                    createdAt
                    lastUpdatedAt
                }
            }`
    });
    return data.returnAllArticles;
}

export async function retreiveArticleFromId(id: string, client: ApolloClient<NormalizedCacheObject>): Promise<Article> {
    const { data } = await client.query({
        query: gql`
        query GetOneArticle($articleId: ID!) {
            returnOneArticle(id: $articleId) {
                id
                title
                description
                content
                image
                createdAt
                lastUpdatedAt
            }
        }`,
        variables: {
            articleId: id, 
        }
    });
    return (data.returnOneArticle);
}