import { ApolloClient, ApolloQueryResult, gql, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import IndexContent from '../components/IndexContent';
import JoinUs from '../components/JoinUs'
import { Article } from '../types/article';
import { apiClient } from './_app';

function Home({ articleList}: {articleList: Article[] })  {
  return (
    <>
      <JoinUs />
      <IndexContent articleList={articleList} />
    </>
  )
}

export async function getServerSideProps() {
    // const client = new ApolloClient({
    //     uri: 'http://localhost:4222/graphql',
    //     cache: new InMemoryCache()
    // });

    const articleList: Article[]  = await retreiveAllArticlesFromDB(apiClient);
    return {
        props: {
            articleList: articleList
        }
    }
}

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
export default Home
