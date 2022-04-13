const {notifyError, notifySuccess} = require('../utils/notify');
const axios = require('axios');
export const SEARCH = 'SEARCH';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_LOADING = 'SET_LOADING';
export const UPDATE_FAVORITE = 'UPDATE_FAVORITE';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';

const baseUrl = process.env.REACT_APP_BASE_URL;


export const login = (user)=>{
      return dispatch =>{
            dispatch({type: UPDATE_USER, payload : user})
      }
}

export const logout = ()=>{
      return dispatch =>{
            dispatch({type : UPDATE_USER, payload : null });
            window.location.href = 'http://localhost:4000/login';
      }
}

//DEVUELVE TODAS LAS RECETAS
export const getAllRecipes = ()=>{
      return async dispatch => {
            dispatch({type : SET_LOADING});

            await axios.get(baseUrl + 'recipe')
            .then(res => {
                  dispatch( {type: GET_ALL_RECIPES, payload : res.data.recipes} )
                  dispatch( {type: SET_LOADING} );
            })

      }
};

//DETALLE DE UNA RECETA
export const recipeDetail = (id)=>{
      return dispatch =>{
            dispatch({type : SET_LOADING})

            axios.get(baseUrl +`recipe/detail/${id}`)
            .then(res => {
                  dispatch( {type: RECIPE_DETAIL, payload : res.data.recipe} )
                  dispatch({type : SET_LOADING})
            })

      }
}

//REALIZA UNA BUSQUEDA
export const search = (input) =>{
      return async dispatch =>{

      }
}

//AÑADE UNA RECETA A FAVORITOS
export const addFavorite = (favoriteId, recipeId)=>{
      return dispatch =>{
            axios.post(baseUrl + `favorite/${favoriteId}/${recipeId}`)
            .then(res => {
                  notifySuccess(res.data.success)
                  dispatch({type: UPDATE_FAVORITE, payload: res.data.result})
            })
            .catch(err => notifyError(err.response.data.error));
      }
}

export const deleteFavorite = (favoriteId, recipeId) =>{
      return dispatch => {
            axios.delete(baseUrl + `favorite/${favoriteId}/${recipeId}`)
            .then(res => {
                  notifySuccess(res.data.success)
                  dispatch({type: UPDATE_FAVORITE, payload: res.data.result})
                  setTimeout(()=>{
                        window.location.reload();
                  },1500)
            })
            .catch(err => notifyError(err.response.data.error));
      }
}

//CREAR UNA RECETA
export const createRecipe = (recipe)=>{
      return dispatch => {

      }
}