import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

function Articles( { articles }: any ) {
    console.log('articles', articles);
    console.log('article1', articles)
    return ( <></>)
}

export async function getServerSideProps() {
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

export default Articles;