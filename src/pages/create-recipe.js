import { Container } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId.js';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const CreateRecipe = () => {
	const user_id = useGetUserId();

	const [cookies, setCookies] = useCookies(['access_token']);

	const [recipe, setRecipe] = useState({
		name: '',
		ingredients: [],
		instructions: '',
		imageUrl: '',
		cookingTime: 0,
		userOwner: user_id,
	});

	const navigate = useNavigate();

	const handleChange = e => {
		const { name, value } = e.target;
		setRecipe({ ...recipe, [name]: value });
	};

	const handleIngredientChange = (e, index) => {
		const { value } = e.target;
		console.log(value, index);
		const ingredients = recipe.ingredients;
		ingredients[index] = value;
		setRecipe({ ...recipe, ingredients });
	};

	const addIngredient = () => {
		setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
	};

	const onSubmit = async e => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:7070/recipes', recipe, {
				headers: {
					authorization: cookies.access_token,
				},
			});
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container
			className='create-recipe'
			sx={{ bgcolor: '#eee', padding: '50px' }}
		>
			<h1 className='text-center pb-3'>Create Recipe</h1>
			<form
				onSubmit={onSubmit}
				className='form-control p-3 w-50 mx-auto d-flex flex-column justify-content-center gap-2'
			>
				<label htmlFor='name'>Name:</label>
				<input
					className='w-100 form-control'
					type='text'
					id='name'
					name='name'
					onChange={handleChange}
				/>
				<label htmlFor='ingredients'>Ingredients</label>
				{recipe.ingredients.map((ingredient, index) => {
					return (
						<input
							key={index}
							type='text'
							name='ingredients'
							id='ingredients'
							value={ingredient}
							onChange={e => handleIngredientChange(e, index)}
						/>
					);
				})}
				<button
					type='button'
					className='w-100 btn btn-info'
					onClick={addIngredient}
				>
					Add Ingredient
				</button>
				<label htmlFor='instructions'>Instructions</label>
				<textarea
					className='w-100 form-control'
					id='instructions'
					name='instructions'
					onChange={handleChange}
				></textarea>
				<label htmlFor='imageUrl'>Image Url</label>
				<input
					className='w-100 form-control'
					type='text'
					id='imageUrl'
					name='imageUrl'
					onChange={handleChange}
				/>
				<label htmlFor='cookingTime'>Cooking Time ( minutes )</label>
				<input
					className='w-100 form-control'
					type='number'
					id='cookingTime'
					name='cookingTime'
					onChange={handleChange}
				/>
				<button type='submit' className='w-100 btn btn-info'>
					Create Recipe
				</button>
			</form>
		</Container>
	);
};

export default CreateRecipe;
