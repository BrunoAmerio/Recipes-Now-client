import { SET_LOADING, UPDATE_USER, RECIPE_DETAIL, GET_ALL_RECIPES, UPDATE_FAVORITE } from "./actions";

const initialState = {
      currentUser : null,
      allRecipes : [],
      recipeDetail : null,
      loading : false
};

const reducer = (state = initialState, {type, payload} )=>{
      switch(type) {
            case UPDATE_USER : 
                  return {
                        ...state,
                        currentUser : payload
                  }
            case SET_LOADING:
                  return {
                        ...state,
                        loading : !state.loading
                  }
            case GET_ALL_RECIPES : 
                  return {
                        ...state,
                        allRecipes : [...payload]
                  };
            case RECIPE_DETAIL : 
                  return {
                        ...state,
                        recipeDetail : payload
                  }
            case UPDATE_FAVORITE:
                  state.currentUser.favorite = payload
                  return {
                        ...state,
                        currentUser : state.currentUser
                  }
            default :
                  return state;
      };
};

export default reducer;