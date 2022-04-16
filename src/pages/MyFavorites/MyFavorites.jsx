import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import s from './MyFavorites.module.scss';

//COMPONENTES
import NavBar from '../../compontents/NavBar/NavBar';
import RecipesContainer from '../../compontents/RecipesContainer/RecipesContainer';

const baseUrl = process.env.REACT_APP_BASE_URL;

const MyFavorites = () => {
	const userFavorite = useSelector(state => state.currentUser.favorite);
	const [favorites, setFavorites] = useState();
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		if (!recipes.length) {
			axios.get(baseUrl + `favorite/${userFavorite._id}`).then(res => {
				setFavorites(res.data);
			});
		}
		if (favorites) {
			const array = [];
			favorites.collectionId.forEach(async id => {
				array.push(
					axios.get(
						`https://api.spoonacular.com/recipes/${id}/information?apiKey=6768c78e57394e049e11f3f23d4a2f2c`
					)
				);
			});

			Promise.all(array).then(res => {
				const array = [];
				res.forEach(promise => {
					array.push(promise.data);
				});
				setRecipes(array);
			});
		}
	}, [favorites]);

	return (
		<div>
			<NavBar />
			{recipes.length ? (
				<RecipesContainer recipes={recipes} place={'favorites'} />
			) : !favorites ? (
				<h1>Loading</h1>
			) : !favorites.collectionId.length ? (
				<h1 className={s.message}>NO HAY FAVORITOS :( </h1>
			) : null}
		</div>
	);
};

export default MyFavorites;
