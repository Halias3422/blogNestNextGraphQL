import { styled, TextField, Typography } from '@mui/material';

const LoginTextField = styled(TextField)({
	width: '300px',
	marginBottom: '30px'
});

const TextFieldSigning = ({ type }: { type: string }) => {
	return (
		<>
			<Typography variant="subtitle2">Your {type}</Typography>
			<LoginTextField
				id={type}
				autoFocus={type === 'login' ? true : false}
				variant="standard"
				type={type}
				required
				InputProps={{
					inputProps: {
						minLength: 4,
						style: {
							textAlign: 'center'
						}
					}
				}}
				sx={{ width: '300px' }}
			/>
		</>
	);
};

export default TextFieldSigning;
