import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ClientOnly from '../components/GlobalComponents/ClientOnly';
import NavBar from '../components/GlobalComponents/NavBar/NavBar';
import JoinUs from '../components/GlobalComponents/JoinUs';
import Header from '../components/GlobalComponents/Header';
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useState
} from 'react';
import { Html } from 'next/document';
import { CurrProfile } from '../types/user';
import RetreiveCurrProfileFromStorage from '../components/GlobalComponents/RetreiveCurrProfileFromStorage';
import { style } from '@mui/system';

const client = new ApolloClient({
	uri: 'http://localhost:4222/graphql',
	cache: new InMemoryCache()
});

export const HeaderTitleContext = createContext<
	[string, Dispatch<SetStateAction<string>>]
>({} as any);

export const CurrProfileContext = createContext<
	[CurrProfile, Dispatch<SetStateAction<CurrProfile>>]
>({} as any);

export const LocalStorageCurrSession = 'CurrSession';

function MyApp({ Component, pageProps }: AppProps) {
	const [headerTitle, setHeaderTitle] = useState('blog NestNext');
	const [currProfile, setCurrProfile] = useState({
		isLoggedIn: false,
		login: null,
		id: null,
		sessionToken: null,
		sessionChecked: false
	} as CurrProfile);

	return (
		<>
			<HeaderTitleContext.Provider value={[headerTitle, setHeaderTitle]}>
				<Header />
				<ApolloProvider client={client}>
					<CurrProfileContext.Provider
						value={[currProfile, setCurrProfile]}
					>
						<RetreiveCurrProfileFromStorage />
						<NavBar />
						<JoinUs />
						<Component {...pageProps} />
					</CurrProfileContext.Provider>
				</ApolloProvider>
			</HeaderTitleContext.Provider>
		</>
	);
}

export default MyApp;
