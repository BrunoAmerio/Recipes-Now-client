import s from './Home.module.scss';
import RecipesContainer from '../../compontents/RecipesContainer/RecipesContainer';
import { getAllRecipes } from '../../redux/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//COMPONENTES

import NavBar from '../../compontents/NavBar/NavBar';

const Home = ()=>{
      const dispatch = useDispatch();
      const recipes = useSelector(state => state.allRecipes);
      const loading = useSelector(state => state.loading);

      useEffect(()=>{
            if(!recipes.length){
                  dispatch( getAllRecipes() )
            }
      },[]);

      return <div className={s.container}>
            <NavBar/>
            {loading ? <h1>CARGANDO</h1>
            :
            <RecipesContainer recipes={recipes}/>
            }     
      </div>
}

export default Home; 