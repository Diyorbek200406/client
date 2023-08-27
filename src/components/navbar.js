import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Navbar = () => {
	const navigate = useNavigate();
	const [active, setActive] = useState('Home');
	const [cookies, setCookies] = useCookies(['access_token']);

	const logout = () => {
		setCookies('access_token', '');
		localStorage.removeItem('user_id');
		navigate('/auth');
	};

	const handleBtn = e => {
		if (e === 'Home') {
			navigate('/');
			setActive(e);
			return;
		}
		if (e === 'Create Recipe') {
			navigate('/create-recipe');
			setActive(e);
			return;
		}
		if (e === 'Saved Recipes') {
			navigate('/saved-recipes');
			setActive(e);
			return;
		}
		if (e === 'Auth') {
			navigate('/auth');
			setActive(e);
			return;
		}
	};

	return (
		<Container
			className='bg-white'
			sx={{
				display: 'flex',
				gap: '30px',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '20px',
			}}
		>
			<Button
				onClick={e => handleBtn(e.target.textContent)}
				color='success'
				variant={`${active === 'Home' ? 'contained' : 'outlined'}`}
			>
				Home
			</Button>
			<Button
				onClick={e => handleBtn(e.target.textContent)}
				color='success'
				variant={`${active === 'Create Recipe' ? 'contained' : 'outlined'}`}
			>
				Create Recipe
			</Button>

			{!cookies?.access_token ? (
				<Button
					onClick={e => handleBtn(e.target.textContent)}
					color='success'
					variant={`${active === 'Auth' ? 'contained' : 'outlined'}`}
				>
					Auth
				</Button>
			) : (
				<>
					<Button
						onClick={e => handleBtn(e.target.textContent)}
						color='success'
						variant={`${active === 'Saved Recipes' ? 'contained' : 'outlined'}`}
					>
						Saved Recipes
					</Button>
					<Button onClick={logout} variant='contained' color='error'>
						Log Out
					</Button>
				</>
			)}
		</Container>
	);
};

export default Navbar;
