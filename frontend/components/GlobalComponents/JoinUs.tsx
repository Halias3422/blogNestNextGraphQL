import { Chip, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CurrProfileContext, LocalStorageCurrSession } from '../../pages/_app';
import ClientOnly from './ClientOnly';
import UserSignDialog from './UserSigningDialog/UserSignDialog';

const GlobalContainer = styled('div')({
	height: '459px',
	backgroundColor: '#ffc017',
	borderBottom: '1px black solid',
	display: 'flex'
});

const LeftContainer = styled('div')({
	marginLeft: '17%',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	height: '100%',
	flex: '1',
	zIndex: '1'
});

const JoinUsText = styled(Typography)({
	whiteSpace: 'nowrap',
	color: '#080808',
	fontWeight: '400',
	fontSize: '100pt'
});

const Subtitle = styled(Typography)({
	color: '#292929',
	lineHeight: '1',
	marginTop: '10px',
	marginBottom: '50px'
});

const RightContainer = styled('div')({
	flex: '3',
	display: 'flex',
	justifyContent: 'flex-end'
});

const StartReading = styled(Chip)({
	backgroundColor: '#191919',
	whiteSpace: 'nowrap',
	fontWeight: '400',
	borderRadius: '25px',
	color: 'white',
	fontSize: '15pt',
	height: '40px',
	paddingLeft: '35px',
	paddingRight: '35px',
	width: 'fit-content',
	'&:hover': {
		backgroundColor: 'black'
	}
});

const SuperUsefulGif = styled('img')({
	height: '100%'
});

const JoinUs = () => {
	const [openUserSignDialog, setOpenUserSignDialog] = useState(false);
	const [userSignDialogType, setUserSignDialogType] = useState('');
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);

	if (currProfile.isLoggedIn || !currProfile.sessionChecked) {
		return <></>;
	}
	return (
		<>
			<GlobalContainer>
				<LeftContainer>
					<JoinUsText variant="h1">Join us.</JoinUsText>
					<Subtitle variant="h5">
						Discover stories, thinking, and expertise from writers
						on any topic.
					</Subtitle>
					<StartReading
						label="Start reading"
						clickable
						onClick={() => {
							setOpenUserSignDialog(true);
							setUserSignDialogType('signUp');
						}}
					></StartReading>
				</LeftContainer>
				<RightContainer>
					<SuperUsefulGif src="https://media1.giphy.com/media/12bSyZ2lLVvZ4s/giphy.gif?cid=ecf05e474pww9fellwu0gocdy5ljdsvpiw22w6gye4dkcuh3&rid=giphy.gif&ct=s" />
				</RightContainer>
			</GlobalContainer>
			<UserSignDialog
				open={openUserSignDialog}
				setOpen={setOpenUserSignDialog}
				signType={userSignDialogType}
				setSignType={setUserSignDialogType}
			/>
		</>
	);
};

export default JoinUs;
