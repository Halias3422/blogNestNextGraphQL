import { MenuItem, Select, SelectChangeEvent, styled } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

const CategorySelect = styled(Select)({
	marginBottom: '20px',
	fontSize: '16pt',
	color: 'black',
	'& fieldset': {
		borderRadius: '25px',
		borderColor: '#757575'
	}
});
const ArticleCategorySelect = ({
	category,
	setCategory
}: {
	category: string;
	setCategory: Dispatch<SetStateAction<string>>;
}) => {
	const [defaultValueCheck, setDefaultValueCheck] = useState(false);
	const changeSelectedCategory = (event: SelectChangeEvent<unknown>) => {
		setCategory(event.target.value as string);
	};

	return (
		<CategorySelect
			labelId="categorySelect"
			id="category"
			fullWidth
			required
			value={category}
			onChange={changeSelectedCategory}
		>
			<MenuItem value={'Placeholder1'}>Placeholder1</MenuItem>
			<MenuItem value={'Placeholder2'}>Placeholder2</MenuItem>
			<MenuItem value={'Placeholder3'}>Placeholder3</MenuItem>
			<MenuItem value={'Placeholder4'}>Placeholder4</MenuItem>
			<MenuItem value={'Placeholder5'}>Placeholder5</MenuItem>
		</CategorySelect>
	);
};

export default ArticleCategorySelect;
