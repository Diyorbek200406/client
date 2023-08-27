import { useState } from 'react';
import axios from 'axios';
import Form from './form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const [_, setCookies] = useCookies(['access_token']);

	const onSubmit = async e => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:7070/auth/login', {
				username,
				password,
			});
			console.log(response);
			setUsername('');
			setPassword('');
			setCookies('access_token', response?.data?.user?.token);
			window.localStorage.setItem('user_id', response?.data?.user?.user_id);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form
			username={username}
			password={password}
			setPassword={setPassword}
			setUsername={setUsername}
			label={'Login'}
			onSubmit={onSubmit}
		/>
	);
};

export default Login;
