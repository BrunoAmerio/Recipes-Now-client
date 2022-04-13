import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { recipeDetail } from '../../redux/actions';
import s from './RecipeDetail.module.scss';

//COMPONENTES
import NavBar from '../../compontents/NavBar/NavBar';

const RecipeDetail = ()=>{
      const {id} = useParams();
      const dispatch = useDispatch();
      const recipe = useSelector(state => state.recipeDetail);
      const loading = useSelector(state => state.loading);
      let div;

      useEffect(()=>{
            if(!recipe){
                  dispatch( recipeDetail(id) )
            } else {
                  document.querySelector('#summary').innerHTML = recipe.summary
                  document.querySelector('#instructions').innerHTML = recipe.instructions
            }
      },[recipe]);



      if(recipe){
            div = <div className={s.container}>
                  <h1>{recipe.title}</h1>
                  <h4>by {recipe.sourceName}</h4>

                  <div className={s.dataContainer}>
                        <div className={s.diets}>
                              <h3>Diets:</h3>
                              <ul>
                                    {recipe.diets.length ? recipe.diets.map(item =>{
                                          return <li key={item}>{item}</li>
                                    }) : 
                                    <h4>No avaible</h4>}
                              </ul>
                        </div>

                        <img src={recipe.image}/>

                        <div className={s.cuisines}>
                              <h3>Cuisines:</h3>
                              <ul>
                                    {recipe.cuisines.length ? recipe.cuisines.map(item =>{
                                          return <li key={item}>{item}</li>
                                    }) :
                                    <h4>No avaible</h4>}
                              </ul>
                        </div>
                  </div>
                  
                  <div className={s.moreData}>
                        <h3>Ready in minutes : {recipe.readyInMinutes} min</h3>
                        <h3>Health Score : {recipe.healthScore} pts</h3>

                        <h3>Ingredients</h3>
                        <ul>
                              {recipe.extendedIngredients.length ? recipe.extendedIngredients.map(item =>{
                                    return <li key={item.id}>{item.original}</li>
                              }) : 
                              <h4>No avaible</h4>}
                        </ul>
                  </div>

                  <h2>Summary</h2>
                  <div id='summary' className={s.summary}/>
                  <h2>Instructions</h2>
                  <div id='instructions'className={s.instructions}/>
            </div>

      } else if(loading){
            div = <h1>CARGANDO</h1>
      }

      return <div>
            <NavBar/>
            {div}
      </div>
}

export default RecipeDetail;