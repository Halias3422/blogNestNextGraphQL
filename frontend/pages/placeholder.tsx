import { styled, Typography } from '@mui/material';

const Container = styled('div')({
	width: 'fit-content',
	margin: '0 auto',
	marginTop: '200px'
});

const Placeholder = () => {
	return (
		<Container>
			<Typography variant="h1">A beautiful placeholder page</Typography>
		</Container>
	);
};

export default Placeholder;
