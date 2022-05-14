import { ApolloClient, ApolloQueryResult, gql, InMemoryCache } from '@apollo/client'
import ArticleList from '../components/ArticleList'
import IndexContent from '../components/IndexContent';
import JoinUs from '../components/JoinUs'

function Home( { articleList}: any)  {
  return (
    <>
      <JoinUs />
      <IndexContent articleList={articleList} />
    </>
  )
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
    });
    return {
        props: {
            articleList: data.returnAllArticles
        }
    }
}
export default Home
