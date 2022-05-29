import {
	Avatar,
	Chip,
	Divider,
	Link,
	ListItemIcon,
	Menu,
	MenuItem,
	styled
} from '@mui/material';
import { MouseEvent, useContext, useState } from 'react';
import {
	CurrProfileContext,
	LocalStorageCurrSession
} from '../../../../../pages/_app';
import FaceIcon from '@mui/icons-material/Face';
import LogoutIcon from '@mui/icons-material/Logout';
import { CurrProfile } from '../../../../../types/user';
import { useMutation } from '@apollo/client';
import { DELETE_USER_SESSION_TOKEN } from '../../../../../pages/api/mutations/usersMutations';
import { useRouter } from 'next/router';

const PRIMARY_CHIP = '#191919';
const PRIMARY_HOVER_CHIP = '#080808';
const SECONDARY_CHIP = '#198616';
const SECONDARY_HOVER_CHIP = '#0f730C';

const UserChip = styled(Chip, {
	shouldForwardProp: (prop) => prop !== 'secondarystate'
})<{ secondarystate: boolean }>(({ secondarystate }) => ({
	backgroundColor: secondarystate ? SECONDARY_CHIP : PRIMARY_CHIP,
	marginLeft: '5%',
	whiteSpace: 'nowrap',
	fontWeight: '400',
	borderRadius: '25px',
	color: 'white',
	fontSize: '11pt',
	padding: '3px',
	height: '37px',
	':hover': {
		backgroundColor: secondarystate
			? SECONDARY_HOVER_CHIP
			: PRIMARY_HOVER_CHIP
	}
}));

const UserMenu = styled(Menu, {
	shouldForwardProp: (prop) => prop !== 'secondarystate'
})<{ secondarystate: boolean }>(({ secondarystate }) => ({
	'& .MuiPaper-root': {
		backgroundColor: secondarystate ? SECONDARY_CHIP : PRIMARY_CHIP,
		color: 'white'
	}
}));

const UserMenuItem = styled(MenuItem, {
	shouldForwardProp: (prop) => prop !== 'secondarystate'
})<{ secondarystate: boolean }>(({ secondarystate }) => ({
	':hover': {
		backgroundColor: secondarystate ? SECONDARY_HOVER_CHIP : '#505050'
	}
}));

const MenuLink = styled(Link)({
	color: 'black',
	whiteSpace: 'nowrap',
	fontSize: '11pt',
	fontWeight: '400',
	marginRight: '3%',
	cursor: 'pointer'
});

const LoggedInNavBarPart = ({
	navBarSecondary
}: {
	navBarSecondary: boolean;
}) => {
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
	const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
		null
	);
	const [deleteUserToken] = useMutation(DELETE_USER_SESSION_TOKEN);

	const logOut = () => {
		deleteUserToken({ variables: { userId: currProfile.id } }).catch(
			() => {}
		);
		const emptyProfile: CurrProfile = {
			isLoggedIn: false,
			login: null,
			id: null,
			sessionToken: null,
			sessionChecked: false
		};
		localStorage.removeItem(LocalStorageCurrSession);
		setCurrProfile(emptyProfile);
		window.location.reload();
	};

	const toggleUserMenu = (event: MouseEvent<HTMLElement>) => {
		if (!userMenuAnchor) {
			setUserMenuAnchor(event.currentTarget);
		} else {
			setUserMenuAnchor(null);
		}
	};

	return (
		<>
			<MenuLink underline={'none'} href="/article/newArticle">
				Write
			</MenuLink>
			<UserChip
				secondarystate={navBarSecondary}
				icon={<FaceIcon style={{ color: 'white' }} />}
				label={currProfile.login}
				clickable
				onClick={toggleUserMenu}
			/>
			<UserMenu
				secondarystate={navBarSecondary}
				disableScrollLock={true}
				anchorEl={userMenuAnchor}
				open={userMenuAnchor ? true : false}
				onClose={toggleUserMenu}
				sx={{ top: '2px' }}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<UserMenuItem secondarystate={navBarSecondary}>
					Placeholder1
				</UserMenuItem>
				<UserMenuItem secondarystate={navBarSecondary}>
					Placeholder2
				</UserMenuItem>
				<UserMenuItem secondarystate={navBarSecondary}>
					Placeholder3
				</UserMenuItem>
				<Divider sx={{ backgroundColor: '#757575' }} />
				<UserMenuItem secondarystate={navBarSecondary} onClick={logOut}>
					<ListItemIcon>
						<LogoutIcon sx={{ color: 'white' }} />
					</ListItemIcon>
					Log out
				</UserMenuItem>
			</UserMenu>
		</>
	);
};

export default LoggedInNavBarPart;
