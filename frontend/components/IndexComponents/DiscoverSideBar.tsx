import { styled, Typography } from '@mui/material';

const GlobalContainer = styled('div')({
	flex: '1'
});
const DiscoverSideBar = () => {
	return (
		<GlobalContainer>
			<Typography variant="caption" fontWeight="bolder" lineHeight="1">
				DISCOVER MORE OF WHAT MATTERS TO YOU
			</Typography>
		</GlobalContainer>
	);
};

export default DiscoverSideBar;
