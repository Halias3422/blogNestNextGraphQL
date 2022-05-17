import { ApolloClient, ApolloQueryResult, gql, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import IndexContent from '../components/IndexContent';
import JoinUs from '../components/JoinUs'
import { Article } from '../types/article';
import { retreiveAllArticlesFromDB } from '../dbLogic/retreiveArticles';
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
    const articleList: Article[]  = await retreiveAllArticlesFromDB(apiClient);
    return {
        props: {
            articleList: articleList
        }
    }
}

export default Home
