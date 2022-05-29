import { styled } from '@mui/material';
import { useContext, useEffect } from 'react';
import { CurrProfileContext, LocalStorageCurrSession } from '../../pages/_app';
import ArticleListIndex from './ArticleListIndex/ArticleListIndex';
import DiscoverSideBar from './DiscoverSideBar';

const GlobalContainer = styled('div')({
	margin: '0 auto',
	marginTop: '50px',
	width: '66%',
	minWidth: '600px',
	display: 'flex'
});

const MainIndexView = () => {
	return (
		<GlobalContainer>
			<ArticleListIndex />
			<DiscoverSideBar />
		</GlobalContainer>
	);
};

export default MainIndexView;
