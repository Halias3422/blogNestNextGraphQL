import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import ClientOnly from '../components/GlobalComponents/ClientOnly';
import MainIndexView from '../components/IndexComponents/MainIndexView';
import TrendingArticlesGrid from '../components/IndexComponents/TrendingArticles/TrendingArticlesContainer';
import { CurrProfile } from '../types/user';
import { CurrProfileContext, LocalStorageCurrSession } from './_app';

const Home: NextPage = () => {
	return (
		<main style={{ maxWidth: '100%' }}>
			<TrendingArticlesGrid />
			<MainIndexView />
		</main>
	);
};

export default Home;
