import { styled, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';

const SignInTextContainer = styled('div')({
	display: 'flex'
});

const DialogAlreadyAccount = ({
	signUp,
	setSignType
}: {
	signUp: boolean;
	setSignType: Dispatch<SetStateAction<string>>;
}) => {
	const sentenceContext = signUp ? 'Already have an account?' : 'No account?';
	const signContext = signUp ? 'Sign in' : 'Create one';

	const setNewSignType = () => {
		if (signUp) {
			setSignType('signIn');
		} else {
			setSignType('signUp');
		}
	};
	return (
		<SignInTextContainer>
			<Typography>{sentenceContext}</Typography>
			<Typography
				fontWeight="bold"
				color="green"
				sx={{ cursor: 'pointer' }}
				onClick={setNewSignType}
			>
				&nbsp;{signContext}
			</Typography>
		</SignInTextContainer>
	);
};

export default DialogAlreadyAccount;
