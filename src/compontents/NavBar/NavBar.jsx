import {
	search,
	getAllRecipes,
	logout,
	reorganization
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifyError } from '../../utils/notify';
import axios from 'axios';
import s from './NavBar.module.scss';

//ICONOS
import SearchIcon from '@mui/icons-material/Search';
import userIcon from '../../img/user.svg';
import cutlery from '../../img/cutlery.svg';
import apple from '../../img/apple.svg';
import desc from '../../img/desc.svg';
import fav from '../../img/fav.svg';
import asc from '../../img/asc.svg';

const baseUrl = process.env.REACT_APP_BASE_URL;

const NavBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.currentUser);
	const currentRecipes = useSelector(state => state.allRecipes);
	const [input, setInput] = useState([]);
	const [categories, setCategories] = useState([]);

	//Toma lo ingresado del search
	const handlerChange = event => {
		setInput(event.target.value);
	};

	//Realiza la busqueda
	const handlerSubmit = event => {
		event.preventDefault();

		if (event.target.name) {
			dispatch(search(event.target.name));
			navigate(`/${event.target.name}`);
		} else if (input.length) {
			dispatch(search(input));
			navigate(`/${input}`);
		}
	};

	//Activa y desctiva los menues
	const toggleUserMenu = event => {
		switch (event.target.name) {
			case 'userMenu':
				document.querySelector('#userMenu').classList.toggle(s.enable);
				break;
			case 'dietMenu':
				document.querySelector('#dietMenu').classList.toggle(s.enable);
				break;
			default:
				break;
		}
	};

	//Ordenamiento
	const sorting = event => {
		switch (event.target.name) {
			case 'asc':
				dispatch(reorganization(currentRecipes, '>'));
				break;
			case 'desc':
				dispatch(reorganization(currentRecipes, '<'));
				break;
			case 'a-z':
				if (event.target.classList.toggle('a')) {
					dispatch(reorganization(currentRecipes, 'a'));
				} else {
					dispatch(reorganization(currentRecipes, 'z'));
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		if (!categories.length) {
			axios.get(baseUrl + 'diet').then(res => {
				const diet = [];
				res.data.diets.forEach(item => {
					diet.push(item.name);
				});
				setCategories(diet);
			});
		}
	}, [categories]);

	return (
		<div className={s.container}>
			<h1
				onClick={() => {
					dispatch(getAllRecipes());
					setTimeout(() => {
						navigate('/');
					}, 500);
				}}
			>
				Recipes Now
			</h1>

			<div className={s.searchContainer}>
				<form className={s.search} onSubmit={handlerSubmit}>
					<input
						type='text'
						placeholder='Search by recipes, cuisines, diets, etc..'
						onChange={handlerChange}
					/>
					<button type='submit'>
						<SearchIcon />
					</button>
				</form>

				<div className={s.filterContainer}>
					<button name='asc' onClick={sorting}>
						<img src={asc} alt='asc' />
						Asc
					</button>

					<button name='desc' onClick={sorting}>
						<img src={desc} alt='desc' />
						Desc
					</button>

					<button name='a-z' onClick={sorting} className='a'>
						<img src={cutlery} alt='cutlery' />
						A-Z
					</button>

					<button name='dietMenu' onClick={event => toggleUserMenu(event)}>
						<img src={apple} name='dietMenu' alt='apple' />
						Diets
					</button>

					<div className={s.dietMenu} id='dietMenu'>
						{categories.length
							? categories.map(item => {
									return (
										<button key={item} onClick={handlerSubmit} name={item}>
											{item}
										</button>
									);
							  })
							: null}
					</div>
				</div>
			</div>

			<div className={s.sideButtons}>
				<button
					onClick={event =>
						!user ? navigate('/login') : toggleUserMenu(event)
					}
				>
					<img name='userMenu' src={userIcon} alt='userIcon' />
				</button>

				<div className={s.userMenu} id='userMenu'>
					<button onClick={() => navigate('/user/recipes')}>My Recipes</button>
					<button onClick={() => dispatch(logout())}>Log out</button>
				</div>

				<button
					onClick={() =>
						!user ? notifyError('No user login') : navigate('/user/favorites')
					}
				>
					<img src={fav} alt='fav' />
				</button>
			</div>
		</div>
	);
};

export default NavBar;
