import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export default function Articles( { articles }: any ) {
    console.log('articles', articles);
    console.log('article1', articles[0])
}

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: 'http://localhost:4222/graphql',
        cache: new InMemoryCache()
    });

    const { data } = await client.query({
        query: gql`
            query GetAllArticles {
                returnAllArticles {
                    id
                    title
                    content
                    createdAt
                    lastUpdatedAt
                }
            }`
    })
    return {
        props: {
            articles: data.returnAllArticles
        }
    }

}