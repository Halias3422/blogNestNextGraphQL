import { Button, InputLabel, styled, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Article } from '../../types/article';
import ArticleCategorySelect from './subComponents/ArticleCategorySelect';
import ArticleTextField from './subComponents/ArticleTextField';

const FieldLabel = styled(InputLabel)({
	fontSize: '18pt',
	color: 'black'
});
const ImagePreviewContainer = styled('div')({
	display: 'flex',
	justifyContent: 'center'
});

const ImagePreview = styled('img')({
	maxWidth: '100%',
	marginTop: '30px',
	marginBottom: '30px',
	backgrounColor: 'blue'
});

const SubmitButtonsContainer = styled('div')({
	display: 'flex',
	justifyContent: 'flex-end'
});

const CancelButton = styled(Button)({
	fontSize: '20pt',
	border: '1px solid grey',
	color: 'black',
	marginRight: '10px',
	borderRadius: '15px',
	backgroundColor: 'white',
	':hover': {
		backgroundColor: 'lightgrey'
	}
});

const SubmitButton = styled(Button)({
	backgroundColor: '#191919',
	color: 'white',
	border: '1px solid grey',
	fontSize: '20pt',
	borderRadius: '15px',
	':hover': {
		backgroundColor: '#080808'
	}
});

const ErrorTypoContainer = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	margin: '30px 0 30px 0',
	color: 'red'
});

const ArticleFormContent = ({
	errorSubmit,
	category,
	setCategory,
	articleToUpdate
}: {
	errorSubmit: string;
	category: string;
	setCategory: Dispatch<SetStateAction<string>>;
	articleToUpdate: Article | null;
}) => {
	const createImagePreview = (event: Event) => {
		if (event.target) {
			const imgPreview = document.getElementById(
				'imagePreview'
			) as HTMLImageElement;
			if (imgPreview) {
				imgPreview.src = (event.target as HTMLInputElement).value;
			}
		}
	};

	useEffect(() => {
		const imageInput = document.getElementById('image') as HTMLInputElement;
		imageInput.addEventListener('input', createImagePreview);
	});

	return (
		<>
			<FieldLabel>Category:</FieldLabel>
			<ArticleCategorySelect
				category={category}
				setCategory={setCategory}
			/>
			<FieldLabel>Title:</FieldLabel>
			<ArticleTextField
				id={'title'}
				placeholder={'write a title...'}
				defaultValue={articleToUpdate ? articleToUpdate.title : ''}
			/>
			<FieldLabel>Description:</FieldLabel>
			<ArticleTextField
				id={'description'}
				placeholder={'write a description...'}
				defaultValue={
					articleToUpdate ? articleToUpdate.description : ''
				}
			/>
			<FieldLabel>Picture:</FieldLabel>
			<ArticleTextField
				id={'image'}
				placeholder={'Enter an image url..'}
				defaultValue={articleToUpdate ? articleToUpdate.image : ''}
			/>
			<ImagePreviewContainer>
				<ImagePreview
					id="imagePreview"
					src={articleToUpdate ? articleToUpdate.image : ''}
				/>
			</ImagePreviewContainer>
			<FieldLabel>Article content:</FieldLabel>
			<ArticleTextField
				id="content"
				placeholder={'Write the article content...'}
				defaultValue={articleToUpdate ? articleToUpdate.content : ''}
			/>
			<ErrorTypoContainer>
				<Typography sx={{ fontSize: '20pt' }}>{errorSubmit}</Typography>
			</ErrorTypoContainer>
			<SubmitButtonsContainer>
				<CancelButton variant="contained">Cancel</CancelButton>
				<SubmitButton type="submit" variant="contained">
					Submit
				</SubmitButton>
			</SubmitButtonsContainer>
		</>
	);
};

export default ArticleFormContent;
