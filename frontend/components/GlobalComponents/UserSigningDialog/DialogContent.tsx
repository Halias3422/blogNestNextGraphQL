import { styled } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import SigningForm from './SigningForm/SigningForm';
import DialogAlreadyAccount from './subComponents/DialogAlreadyAccount';
import DialogSignList from './subComponents/DialogSignChip';
import UserDialogTitle from './subComponents/DialogTitle';

const GlobalContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	margin: '10% 20%'
});

const DialogContent = ({
	setOpen,
	setSignType,
	signUp,
	openSigningForm,
	setOpenSigningForm
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
	setSignType: Dispatch<SetStateAction<string>>;
	signUp: boolean;
	openSigningForm: boolean;
	setOpenSigningForm: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<GlobalContainer>
			{openSigningForm ? (
				<SigningForm
					setOpen={setOpen}
					signUp={signUp}
					setOpenSigningForm={setOpenSigningForm}
				/>
			) : (
				<>
					<UserDialogTitle
						title={signUp ? 'Join NestNext.' : 'Welcome back.'}
					/>
					<DialogSignList
						signUp={signUp}
						setOpenSigningForm={setOpenSigningForm}
					/>
				</>
			)}
			<DialogAlreadyAccount signUp={signUp} setSignType={setSignType} />
		</GlobalContainer>
	);
};

export default DialogContent;
