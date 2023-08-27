import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';

const SavedRecipes = () => {
	const [savedRecipes, setSavedRecipes] = useState([]);
	const user_id = useGetUserId();

	useEffect(() => {
		const fetchSaveRecipe = async () => {
			try {
				const response = await axios.get(
					`http://localhost:7070/recipes/savedRecipes/${user_id}`
				);
				setSavedRecipes(response?.data?.savedRecipes);
			} catch (error) {
				console.log(error);
			}
		};
		fetchSaveRecipe();
	}, []);

	return (
		<Container sx={{ bgcolor: '#eee' }}>
			<h1 className='text-center'>Saved Recipes</h1>
			<ul className='ul'>
				{savedRecipes &&
					savedRecipes?.map(e => {
						return (
							<li
								key={e._id}
								style={{ borderColor: '#ccc' }}
								className='li border border-2 list-unstyled p-3 rounded-4'
							>
								<div>
									<h2>{e?.name}</h2>
								</div>
								<div className='instructions'>
									<p>{e.instructions}</p>
								</div>
								<img
									className='rasm my-4'
									src={e?.imageUrl}
									alt={e?.name}
									width='100%'
								/>
								<p>Cooking Time: {e?.cookingTime} ( minutes )</p>
							</li>
						);
					})}
			</ul>
		</Container>
	);
};

export default SavedRecipes;
