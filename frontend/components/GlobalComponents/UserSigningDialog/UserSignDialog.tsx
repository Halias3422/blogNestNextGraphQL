import { Dialog, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useState } from 'react';
import DialogTermsService from './subComponents/DialogTermsService';
import DialogContent from './DialogContent';

const CloseIconContainer = styled('div')({
	display: 'flex',
	width: '98%',
	justifyContent: 'flex-end',
	marginTop: '2%',
	color: '#757575'
});

const UserSigningDialog = ({
	open,
	setOpen,
	signType,
	setSignType
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	signType: string;
	setSignType: Dispatch<SetStateAction<string>>;
}) => {
	const signUp = signType === 'signUp' ? true : false;
	const [openSigningForm, setOpenSigningForm] = useState(false);

	return (
		<Dialog
			BackdropProps={{
				style: { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
			}}
			fullWidth
			maxWidth="sm"
			open={open}
			onClose={() => {
				setOpen(false);
				setOpenSigningForm(false);
			}}
		>
			<CloseIconContainer>
				<CloseIcon
					sx={{ right: '0', cursor: 'pointer' }}
					onClick={() => {
						setOpen(false);
						setOpenSigningForm(false);
					}}
				/>
			</CloseIconContainer>
			<DialogContent
				setOpen={setOpen}
				setSignType={setSignType}
				signUp={signUp}
				openSigningForm={openSigningForm}
				setOpenSigningForm={setOpenSigningForm}
			/>
			<DialogTermsService signUp={signUp} />
		</Dialog>
	);
};

export default UserSigningDialog;
