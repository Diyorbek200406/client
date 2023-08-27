import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';
import { useCookies } from 'react-cookie';

const Home = () => {
	const [recipes, setRecipes] = useState([]);

	const [savedRecipes, setSavedRecipes] = useState([]);

	const user_id = useGetUserId();

	const [cookies, setCookies] = useCookies(['access_token']);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await axios.get('http://localhost:7070/recipes');
				setRecipes(response?.data?.data);
			} catch (error) {
				console.log(error);
			}
		};

		const fetchSaveRecipe = async () => {
			try {
				const response = await axios.get(
					`http://localhost:7070/recipes/savedRecipes/ids/${user_id}`
				);
				setSavedRecipes(response?.data?.savedRecipes);
			} catch (error) {
				console.log(error);
			}
		};
		fetchRecipe();

		if (cookies.access_token) {
			fetchSaveRecipe();
		}
	}, []);

	const saveRecipe = async recipe_id => {
		try {
			const response = await axios.put(
				'http://localhost:7070/recipes',
				{
					recipe_id,
					user_id,
				},
				{ headers: { authorization: cookies['access_token'] } }
			);

			setSavedRecipes(response?.data?.savedRecipes);
		} catch (error) {
			console.log(error);
		}
	};

	const isSavedRecipe = id => savedRecipes?.includes(id);

	return (
		<Container sx={{ bgcolor: '#eee' }}>
			<h1 className='text-center'>Recipes</h1>
			<ul className='ul'>
				{recipes &&
					recipes?.map(e => {
						return (
							<li
								key={e._id}
								style={{ borderColor: '#ccc' }}
								className='li border border-2 list-unstyled p-3 rounded-4'
							>
								<div>
									<h2>{e?.name}</h2>
									<button
										onClick={() => saveRecipe(e?._id)}
										className='btn btn-success'
										disabled={isSavedRecipe(e?._id)}
									>
										{isSavedRecipe ? 'Saved' : 'Save'}
									</button>
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

export default Home;
