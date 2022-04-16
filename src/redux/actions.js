const { notifyError, notifySuccess } = require('../utils/notify');
const axios = require('axios');
export const SET_LOADING = 'SET_LOADING';
export const UPDATE_USER = 'UPDATE_USER';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';
export const UPDATE_RECIPES = 'UPDATE_RECIPES';
export const UPDATE_FAVORITE = 'UPDATE_FAVORITE';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';

const baseUrl = process.env.REACT_APP_BASE_URL;

function sorting(array, method) {
	console.log('Asi entra', array);
	let newArray = array;

	if (method === '>') {
		newArray.sort((a, b) => (a.healthScore > b.healthScore ? 1 : -1));
	} else if (method === '<') {
		newArray.sort((a, b) => (a.healthScore > b.healthScore ? -1 : 1));
	} else if (method === 'a') {
		newArray.sort((a, b) => (a.title > b.title ? 1 : -1));
	} else if (method === 'z') {
		newArray.sort((a, b) => (a.title > b.title ? -1 : 1));
	}

	console.log('Asi sale', newArray);

	return newArray;
}

//Recibe el arreglo y el metodo de ordenamiento y lo envia la funcion sorting
export const reorganization = (array, method) => {
	const result = sorting(array, method);
	return dispatch => {
		dispatch({ type: GET_ALL_RECIPES, payload: result });
	};
};

//INICIAR SESION
export const login = user => {
	return dispatch => {
		dispatch({ type: UPDATE_USER, payload: user });
	};
};

//CERRAR SESION
export const logout = () => {
	return dispatch => {
		dispatch({ type: UPDATE_USER, payload: null });
		setTimeout(() => {
			window.location.href = '/login';
		}, 500);
	};
};

//DEVUELVE TODAS LAS RECETAS
export const getAllRecipes = () => {
	return async dispatch => {
		dispatch({ type: SET_LOADING });

		await axios.get(baseUrl + 'recipe').then(res => {
			dispatch({ type: GET_ALL_RECIPES, payload: res.data.recipes });
			dispatch({ type: SET_LOADING });
		});
	};
};

//DETALLE DE UNA RECETA
export const recipeDetail = id => {
	return dispatch => {
		dispatch({ type: SET_LOADING });

		axios.get(baseUrl + `recipe/detail/${id}`).then(res => {
			dispatch({ type: RECIPE_DETAIL, payload: res.data.recipe });
			dispatch({ type: SET_LOADING });
		});
	};
};

//REALIZA UNA BUSQUEDA
export const search = input => {
	return async dispatch => {
		dispatch({ type: SET_LOADING });

		axios
			.get(
				`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&query=${input}&number=50&apiKey=6768c78e57394e049e11f3f23d4a2f2c`
			)
			.then(res => {
				dispatch({ type: GET_ALL_RECIPES, payload: res.data.results });
				dispatch({ type: SET_LOADING });
			});
	};
};

//AÑADE UNA RECETA A FAVORITOS
export const addFavorite = (favoriteId, recipeId) => {
	return dispatch => {
		axios
			.post(baseUrl + `favorite/${favoriteId}/${recipeId}`)
			.then(res => {
				notifySuccess(res.data.success);
				dispatch({ type: UPDATE_FAVORITE, payload: res.data.result });
			})
			.catch(err => notifyError(err.response.data.error));
	};
};

//ELIMINAR UN FAVORITO
export const deleteFavorite = (favoriteId, recipeId) => {
	return dispatch => {
		axios
			.delete(baseUrl + `favorite/${favoriteId}/${recipeId}`)
			.then(res => {
				notifySuccess(res.data.success);
				dispatch({ type: UPDATE_FAVORITE, payload: res.data.result });

				setTimeout(() => {
					window.location.reload();
				}, 1500);
			})
			.catch(err => notifyError(err.response.data.error));
	};
};

export const deleteRecipe = (userId, recipeId) => {
	return dispatch => {
		axios.delete(baseUrl + `/recipe/${userId}/${recipeId}`).then(res => {
			notifySuccess(res.data.success);
			dispatch({ type: UPDATE_RECIPES, payload: res.data.result });

			setTimeout(() => {
				window.location.reload();
			}, 1500);
		});
	};
};
