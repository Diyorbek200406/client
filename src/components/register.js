import { useState } from 'react';
import Form from './form';
import axios from 'axios';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async e => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:7070/auth/register', {
				username,
				password,
			});
			setUsername('');
			setPassword('');
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
			label={'Register'}
			onSubmit={onSubmit}
		/>
	);
};

export default Register;
