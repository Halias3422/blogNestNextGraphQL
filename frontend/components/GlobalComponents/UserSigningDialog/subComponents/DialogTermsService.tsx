import { Link, styled, Typography } from '@mui/material';

const TermsTypo = styled(Typography)({
	color: '#757575',
	margin: '0px 60px 80px 60px',
	textAlign: 'center'
});

const DialogTermsService = ({ signUp }: { signUp: boolean }) => {
	const wordContext = signUp ? 'Sign Up' : 'Sign In';

	return (
		<TermsTypo variant="caption">
			Click "{wordContext}" to agree to NestNext's{' '}
			<Link
				color="#757575"
				href="#"
				sx={{ textDecorationColor: 'darkgrey' }}
			>
				Terms of Service
			</Link>{' '}
			and acknowledge that NestNext's{' '}
			<Link
				color="#757575"
				href="#"
				sx={{
					textDecorationColor: 'darkgrey'
				}}
			>
				Privacy Policy
			</Link>{' '}
			applies to you.
		</TermsTypo>
	);
};

export default DialogTermsService;
