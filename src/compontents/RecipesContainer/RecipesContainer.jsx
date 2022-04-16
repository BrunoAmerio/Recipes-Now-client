import { useSelector } from 'react-redux';
import s from './RecipesContainer.module.scss';

//COMPONENTES
import RecipeContainer from './Recipe/RecipeContainer';
import { useEffect, useState } from 'react';
import paginate from '../../utils/paginate';
import { useLocation, useNavigate } from 'react-router-dom';

const RecipesContainer = ({ recipes, place }) => {
	const navigate = useNavigate();
	const currentLocation = useLocation();
	//Paginado
	const elementsPerPage = 12;
	const [page, setPage] = useState(0);
	const [currentPage, setCurrentPage] = useState([]);

	const arrayButtons = [];
	const loading = useSelector(state => state.loading);

	console.log(currentLocation);

	(function paginating() {
		const totalPages = Math.ceil(recipes.length / elementsPerPage);
		for (let i = 1; i <= totalPages; i++) {
			arrayButtons.push(
				<button
					onClick={() => {
						setPage(i - 1);
					}}
					key={i}
				>
					{i}
				</button>
			);
		}
	})();

	useEffect(() => {
		setCurrentPage(paginate(recipes, page, elementsPerPage));
	}, [page, recipes]);

	return (
		<div className={s.container}>
			{loading ? (
				<h1>LOADING</h1>
			) : currentPage ? (
				currentPage.map(item => {
					return <RecipeContainer recipe={item} place={place} key={item.id} />;
				})
			) : (
				<h1> No hay recetas para mostrar </h1>
			)}
			<div className={s.paginate}>{arrayButtons}</div>
		</div>
	);
};

export default RecipesContainer;
