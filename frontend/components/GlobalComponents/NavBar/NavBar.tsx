import { AppBar, styled, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import ClientOnly from '../ClientOnly';
import UserSignDialog from '../UserSigningDialog/UserSignDialog';
import LeftNavBarContainer from './LeftNavBarContainer';
import RightNavBarContainer from './RightNavBarContainer/RightNavBarContainer';

const PRIMARY_NAVBAR = '#ffc017';
const SECONDARY_NAVBAR = '#ffffff';

const MyNavBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'secondarystate'
})<{ secondarystate: boolean }>(({ secondarystate }) => ({
	backgroundColor: secondarystate ? SECONDARY_NAVBAR : PRIMARY_NAVBAR,
	color: 'black',
	height: '75px',
	borderBottom: '1px black solid',
	transition: 'background-color 0.3s linear'
}));

const MenuContainer = styled('div')({
	width: '66%',
	height: '100%',
	margin: '0 auto',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	minWidth: '800px'
});

const NavBar = () => {
	const [navBarSecondary, setNavBarSecondary] = useState(false);
	const [openUserSignDialog, setOpenUserSignDialog] = useState(false);
	const [userSignDialogType, setUserSignDialogType] = useState('');

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 460 && !navBarSecondary) {
				setNavBarSecondary(true);
			} else if (window.scrollY <= 460 && navBarSecondary) {
				setNavBarSecondary(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		const getStarted = document.getElementById('getStarted');
	});

	return (
		<>
			<MyNavBar
				secondarystate={navBarSecondary}
				id="navbar"
				elevation={0}
			>
				<MenuContainer>
					<LeftNavBarContainer />
					<ClientOnly>
						<RightNavBarContainer
							props={{
								navBarSecondary,
								setOpenUserSignDialog,
								setUserSignDialogType
							}}
						/>
					</ClientOnly>
				</MenuContainer>
			</MyNavBar>
			<Toolbar />
			<UserSignDialog
				open={openUserSignDialog}
				setOpen={setOpenUserSignDialog}
				signType={userSignDialogType}
				setSignType={setUserSignDialogType}
			/>
		</>
	);
};

export default NavBar;
