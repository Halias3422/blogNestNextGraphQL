import { Button, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { CurrProfileContext } from '../../pages/_app';
import { Article } from '../../types/article';

const EditButton = styled(Button)({
	marginBottom: '20px',
	backgroundColor: '#191919',
	':hover': {
		backgroundColor: '#080808'
	}
});

const EditArticleButton = ({ article }: { article: Article }) => {
	const [currProfile, setCurrProfile] = useContext(CurrProfileContext);
	const [articleEditable, setArticleEditable] = useState(false);
	const router = useRouter();

	const handleArticleEdit = () => {
		router.push({
			pathname: '/article/edit/' + encodeURIComponent(article.title),
			query: { id: article.id }
		});
	};

	useEffect(() => {
		if (
			currProfile.login === article.author.login &&
			currProfile.id === article.author.id &&
			articleEditable === false
		) {
			setArticleEditable(true);
		}
	});

	return articleEditable ? (
		<EditButton variant="contained" onClick={handleArticleEdit}>
			Edit article
		</EditButton>
	) : (
		<></>
	);
};

export default EditArticleButton;
