import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './RecipeContainer.module.scss';
import { addFavorite, deleteFavorite } from '../../../redux/actions';

//ICONOS
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

const baseUrl = process.env.REACT_APP_BASE_URL;


const RecipeContainer = ( {recipe, favorites} )=>{
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const userFavorite = useSelector(state => state.currentUser?.favorite);

      const addToFavorite = (recipeId)=>{
            dispatch( addFavorite(userFavorite._id, recipeId) );
      };

      const deleteToFavorite = (recipeId)=>{
            dispatch( deleteFavorite(userFavorite._id, recipeId) );
      };

      console.log('esta es la receta', recipe)

      return <div className={s.container} key={recipe.id}>

            <div className={s.dataContainer} onClick={() => navigate(`/recipe/${recipe.id ? recipe.id : recipe._id}`)}>
                  <img src={recipe.image} alt='Recipe'/>
                  <h1>{recipe.title} </h1>

                  <div className={s.moreInfo}>
                        <div className={s.data}>
                              <h3>Dietas : </h3>
                              <ul>
                                    {recipe.diets.length ?  recipe.diets.map(diet =>{
                                          return <li key={diet}>{diet}</li>
                                    }) :
                                    <li>No avaible</li>
                                    }
                              </ul>
                        </div>

                        <div className={s.data}>
                              <h3>Cuisines : </h3>
                              <ul>
                                    {recipe.cuisines.length ? recipe.cuisines.map( (cuisine) =>{
                                          return <li key={cuisine}> {cuisine} </li>
                                    }) : 
                                    <li>No avaible</li>
                                    }
                              </ul>
                        </div>
                  </div>

                  <h3>Ready in : {recipe.readyInMinutes}min </h3>
                  <h3>Plates per preparation : {recipe.servings} </h3>
            </div>

            {!favorites ? <button onClick={() => addToFavorite(recipe.id)}>
                              <FavoriteIcon />
                        </button>
            : 
                  <button onClick={() => deleteToFavorite(recipe.id)}>
                        <DeleteIcon/>
                  </button>
            }
      </div>
}

export default RecipeContainer;