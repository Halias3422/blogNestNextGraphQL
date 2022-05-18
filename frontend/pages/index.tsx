import {
    ApolloClient,
    ApolloQueryResult,
    gql,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import IndexContent from "../components/IndexContent";
import JoinUs from "../components/JoinUs";
import { Article } from "../types/article";
import { retreiveAllArticlesFromDB } from "../dbLogic/retreiveArticles";
import { apiClient } from "./_app";
import { CurrProfileContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";

function Home({ articleList }: { articleList: Article[] }) {
    const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
    const [viewJoinUs, setViewJoinUs] = useState(true);

    useEffect(() => {
        if (currProfile && currProfile.isLoggedIn) {
            setViewJoinUs(false);
        }
    });
    return (
        <>
            {viewJoinUs ? <JoinUs /> : null}
            <IndexContent articleList={articleList} />
        </>
    );
}

export async function getServerSideProps() {
    const articleList: Article[] = await retreiveAllArticlesFromDB(apiClient);
    return {
        props: {
            articleList: articleList,
        },
    };
}

export default Home;
