import { Box, Chip, styled, SvgIconTypeMap } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Dispatch, ReactElement, SetStateAction } from 'react';

const SignChip = styled(Chip)({
	fontSize: '13pt',
	width: '240px',
	justifyContent: 'left',
	paddingLeft: '10px',
	height: '40px',
	marginTop: '10px',
	borderRadius: '25px',
	border: '1px solid darkgrey',
	'&.MuiChip-clickable:hover': {
		border: '1px solid grey',
		backgroundColor: 'transparent'
	}
});

const ListChips = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: '40px',
	marginBottom: '40px'
});

const DialogSignList = ({
	signUp,
	setOpenSigningForm
}: {
	signUp: boolean;
	setOpenSigningForm: Dispatch<SetStateAction<boolean>>;
}) => {
	const chipLabel = signUp ? 'Sign up' : 'Sign in';
	return (
		<ListChips>
			<SignChip
				variant="outlined"
				clickable
				label={chipLabel + ' with google'}
				icon={<GoogleIcon sx={{ marginBottom: '3px' }} />}
			/>
			<SignChip
				variant="outlined"
				clickable
				label={chipLabel + ' with facebook'}
				icon={<FacebookIcon sx={{ marginBottom: '3px' }} />}
			/>
			<SignChip
				variant="outlined"
				clickable
				label={chipLabel + ' with email'}
				icon={<MailOutlineIcon sx={{ marginBottom: '3px' }} />}
				onClick={() => {
					setOpenSigningForm(true);
				}}
			/>
		</ListChips>
	);
};

export default DialogSignList;
