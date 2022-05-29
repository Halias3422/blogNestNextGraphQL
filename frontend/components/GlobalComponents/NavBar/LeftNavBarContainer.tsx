import { Link, styled, Typography } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import IconButton from '@mui/material/IconButton';

const LeftMenuContainer = styled('div')({
	whiteSpace: 'nowrap',
	display: 'flex',
	alignItems: 'center',
	flex: '1'
});

const HomeLink = styled(Link)({
	color: 'black',
	textDecoration: 'none'
});

const LeftNavBarContainer = () => {
	return (
		<LeftMenuContainer>
			<IconButton
				disableRipple
				sx={{ color: 'black', bottom: '6px' }}
				href="/"
			>
				<FeedIcon fontSize="large" />
			</IconButton>
			<HomeLink variant="h4" fontWeight={'bolder'} href="/">
				Blog NestNext
			</HomeLink>
		</LeftMenuContainer>
	);
};

export default LeftNavBarContainer;
