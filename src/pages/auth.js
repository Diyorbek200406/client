import { Container } from '@mui/material';
import Login from '../components/login';
import Register from '../components/register';

const Auth = () => {
	return (
		<Container
			sx={{ bgcolor: 'transparent', display: 'flex', padding: '20px' }}
		>
			<Login />
			<Register />
		</Container>
	);
};

export default Auth;
