import { DialogTitle } from '@mui/material';

const UserDialogTitle = ({ title }: { title: string }) => {
	return (
		<DialogTitle variant="h4" fontWeight="normal">
			{title}
		</DialogTitle>
	);
};

export default UserDialogTitle;
