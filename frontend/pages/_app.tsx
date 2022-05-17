import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MyHead from '../components/MyHead'
import NavBar from '../components/NavBar'
import { useState } from 'react';
import { Article, singleArticle } from '../types/article';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { assertInputObjectType } from 'graphql';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <MyHead />
      <NavBar />
      <Component {...pageProps} />
    </>
  )

}
export const apiClient = new ApolloClient({
  uri: 'http://localhost:4222/graphql',
  cache: new InMemoryCache()
});

export default MyApp
