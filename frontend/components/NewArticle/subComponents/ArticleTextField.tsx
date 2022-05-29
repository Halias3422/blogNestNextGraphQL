import { styled, TextField } from '@mui/material';

const ArticleField = styled(TextField)({
	marginBottom: '20px',
	'& fieldset': {
		borderRadius: '25px',
		borderColor: '#757575'
	}
});

const ArticleTextField = ({
	id,
	placeholder,
	defaultValue
}: {
	id: string;
	placeholder: string;
	defaultValue: string;
}) => {
	return (
		<>
			<ArticleField
				id={id}
				type={id === 'image' ? 'url' : 'text'}
				autoFocus={id === 'title' ? true : false}
				multiline={id === 'image' ? false : true}
				defaultValue={defaultValue}
				fullWidth
				required
				InputProps={{ style: { fontSize: '16pt', color: 'black' } }}
				size="medium"
				placeholder={placeholder}
			/>
		</>
	);
};

export default ArticleTextField;
