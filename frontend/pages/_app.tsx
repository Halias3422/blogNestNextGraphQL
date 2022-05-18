import "../styles/globals.css";
import type { AppProps } from "next/app";
import MyHead from "../components/MyHead";
import NavBar from "../components/NavBar";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CurrProfile } from "../types/currProfile";
import React, { useEffect, useState } from "react";
import { CurrProfileContext } from "../context/userContext";

export const LocalStorageLoggedInUserKey = "loggedIn";

function MyApp({ Component, pageProps }: AppProps) {
    const currProfileEmpty: CurrProfile = {
        isLoggedIn: false,
        login: null,
        id: null,
    };
    const [currProfile, setCurrProfile] = useState(currProfileEmpty);

    useEffect(() => {
        const loggedInUserString = localStorage.getItem(LocalStorageLoggedInUserKey);

        if (loggedInUserString) {
            const loggedInUserJson = JSON.parse(loggedInUserString);
            setCurrProfile(loggedInUserJson);
        }
    }, []);

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
