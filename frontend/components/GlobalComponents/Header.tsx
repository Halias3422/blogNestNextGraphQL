import Head from 'next/head';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { HeaderTitleContext } from '../../pages/_app';

const Header = () => {
	const [headerTitle, setHeaderTitle] = useContext(HeaderTitleContext);
	return (
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta
				name="description"
				content="A wonderful website with wonderful articles"
			/>
			<link rel="icon" href="/favicon.ico" />
			{/* <link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
			/> */}
			<title>{headerTitle}</title>
		</Head>
	);
};

export default Header;
