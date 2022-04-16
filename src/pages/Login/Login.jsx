import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { notifyError, notifySuccess } from '../../utils/notify';
import axios from 'axios';
import s from './Login.module.scss';

import { login } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		userName: '',
		password: ''
	});

	const handlerChange = event => {
		setUser({
			...user,
			[event.target.name]: event.target.value
		});
	};

	const handlerSubmit = event => {
		event.preventDefault();
		if (!user.userName.length || !user.password.length)
			return notifyError('Some fields are empty');

		axios
			.post(baseUrl + 'login', { ...user })
			.then(res => {
				dispatch(login(res.data.user));
				notifySuccess(res.data.success);
				navigate('/');
			})
			.catch(err => notifyError(err.response.data.error));
	};

	return (
		<div className={s.container}>
			<Button variant='contained' onClick={() => navigate('/')}>
				Back to home
			</Button>

			<form onSubmit={handlerSubmit} className={s.formContainer}>
				<TextField label='Username' name='userName' onChange={handlerChange} />
				<TextField
					label='password'
					name='password'
					type='password'
					onChange={handlerChange}
				/>
				<Button variant='contained' type='submit'>
					Login
				</Button>
				<p>
					Or create a new account <a href='/register'>here</a>{' '}
				</p>
			</form>
		</div>
	);
};

export default Login;
