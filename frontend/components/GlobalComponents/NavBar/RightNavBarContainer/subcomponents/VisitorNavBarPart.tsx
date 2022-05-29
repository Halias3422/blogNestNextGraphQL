import { Chip, Link, styled } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const PRIMARY_CHIP = '#191919';
const PRIMARY_HOVER_CHIP = '#080808';
const SECONDARY_CHIP = '#198616';
const SECONDARY_HOVER_CHIP = '#0f730C';

const MenuLink = styled(Link)({
	color: 'black',
	whiteSpace: 'nowrap',
	fontSize: '11pt',
	fontWeight: '400',
	marginRight: '3%',
	cursor: 'pointer'
});

const GetStarted = styled(Chip, {
	shouldForwardProp: (prop) => prop !== 'secondarystate'
})<{ secondarystate: boolean }>(({ secondarystate }) => ({
	backgroundColor: secondarystate ? SECONDARY_CHIP : PRIMARY_CHIP,
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
interface Props {
	navBarSecondary: boolean;
	setOpenUserSignDialog: Dispatch<SetStateAction<boolean>>;
	setUserSignDialogType: Dispatch<SetStateAction<string>>;
}

const VisitorNavBarPart = ({ props }: { props: Props }) => {
	const { navBarSecondary, setOpenUserSignDialog, setUserSignDialogType } =
		props;
	return (
		<>
			<MenuLink
				underline={'none'}
				onClick={() => {
					setOpenUserSignDialog(true);
					setUserSignDialogType('signIn');
				}}
			>
				Sign In
			</MenuLink>
			<GetStarted
				secondarystate={navBarSecondary}
				id="getStarted"
				label="Get started"
				clickable
				onClick={() => {
					setOpenUserSignDialog(true);
					setUserSignDialogType('signUp');
				}}
			/>
		</>
	);
};

export default VisitorNavBarPart;
