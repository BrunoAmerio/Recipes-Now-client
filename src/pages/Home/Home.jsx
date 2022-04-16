import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/actions';
import { useEffect } from 'react';
import s from './Home.module.scss';

//COMPONENTES
import RecipesContainer from '../../compontents/RecipesContainer/RecipesContainer';
import NavBar from '../../compontents/NavBar/NavBar';

const Home = () => {
	const dispatch = useDispatch();
	const recipes = useSelector(state => state.allRecipes);
	const loading = useSelector(state => state.loading);

	useEffect(() => {
		if (!recipes.length) {
			dispatch(getAllRecipes());
		}
	}, [dispatch]);

	return (
		<div className={s.container}>
			<NavBar />
			{loading ? <h1>CARGANDO</h1> : <RecipesContainer recipes={recipes} />}
		</div>
	);
};

export default Home;
