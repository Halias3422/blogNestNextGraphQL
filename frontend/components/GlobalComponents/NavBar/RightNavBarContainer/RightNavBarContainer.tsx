import { Chip, Link, styled } from '@mui/material';
import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';
import {
	CurrProfileContext,
	LocalStorageCurrSession
} from '../../../../pages/_app';
import { CurrProfile } from '../../../../types/user';
import LoggedInNavBarPart from './subcomponents/LoggedInNavBarPart';
import VisitorNavBarPart from './subcomponents/VisitorNavBarPart';

const RightMenuContainer = styled('div')({
	flex: '2',
	marginRight: '0',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end'
});

const MenuLink = styled(Link)({
	color: 'black',
	whiteSpace: 'nowrap',
	fontSize: '11pt',
	fontWeight: '400',
	marginRight: '3%',
	cursor: 'pointer'
});

interface Props {
	navBarSecondary: boolean;
	setOpenUserSignDialog: Dispatch<SetStateAction<boolean>>;
	setUserSignDialogType: Dispatch<SetStateAction<string>>;
}

const RightNavBarContainer = ({ props }: { props: Props }) => {
	const { navBarSecondary, setOpenUserSignDialog, setUserSignDialogType } =
		props;
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);

	return (
		<RightMenuContainer>
			<MenuLink underline={'none'} href="/ourStory">
				Our story
			</MenuLink>
			<MenuLink underline={'none'} href="/membership">
				Membership
			</MenuLink>
			{currProfile.sessionChecked ? (
				currProfile.isLoggedIn ? (
					<LoggedInNavBarPart navBarSecondary={navBarSecondary} />
				) : (
					<VisitorNavBarPart props={props} />
				)
			) : (
				<></>
			)}
		</RightMenuContainer>
	);
};

export default RightNavBarContainer;
