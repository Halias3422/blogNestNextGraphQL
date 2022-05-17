import "../styles/globals.css";
import type { AppProps } from "next/app";
import MyHead from "../components/MyHead";
import NavBar from "../components/NavBar";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CurrProfile } from "../types/currProfile";
import React, { useState } from "react";
import { CurrProfileContext } from "../context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
    const currProfileEmpty: CurrProfile = {
        isLoggedIn: false,
        login: null,
    };
    const [currProfile, setCurrProfile] = useState(currProfileEmpty);

    return (
        <>
            <MyHead />
            <CurrProfileContext.Provider value={[currProfile, setCurrProfile]}>
                <NavBar />
                <Component {...pageProps} />
            </CurrProfileContext.Provider>
        </>
    );
}
export const apiClient = new ApolloClient({
    uri: "http://localhost:4222/graphql",
    cache: new InMemoryCache(),
});

export default MyApp;
