import { Container } from '@mui/material';

const Form = ({
	username,
	password,
	setPassword,
	setUsername,
	label,
	onSubmit,
}) => {
	return (
		<Container className='p-5'>
			<h1 className='text-center'>{label}</h1>
			<form
				onSubmit={onSubmit}
				className='form-control d-flex flex-column gap-3 align-items-center justify-content-center p-5 mx-auto'
			>
				<div className='form-group d-flex flex-column w-100'>
					<label htmlFor='username'>Username:</label>
					<input
						value={username}
						type='text'
						id='username'
						className='form-control w-100'
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className='form-group d-flex flex-column w-100'>
					<label htmlFor='password'>Password:</label>
					<input
						value={password}
						type='password'
						id='password'
						className='form-control w-100'
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit' className='btn btn-primary form-control'>
					{label}
				</button>
			</form>
		</Container>
	);
};

export default Form;
