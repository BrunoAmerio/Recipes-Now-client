import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from './MyRecipes.module.scss';

//COMPONENTES
import NavBar from '../../compontents/NavBar/NavBar';
import RecipesContainer from '../../compontents/RecipesContainer/RecipesContainer';
import { useSelector } from 'react-redux';

const baseUrl = process.env.REACT_APP_BASE_URL;


const MyRecipes = ()=>{
      const currentUser = useSelector(state => state.currentUser)
      const [userRecipe, setUserRecipe] = useState([]);
      const navigate = useNavigate();

      useEffect(()=>{
            axios.get(baseUrl + `recipe/user/${currentUser._id}`)
            .then( res => {
                  const array = [];
                  res.data.recipes.forEach(recipe =>{
                        array.push( axios.get(baseUrl + `recipe/detail/${recipe}`) )
                  })
                  console.log(array)
                  Promise.all(array)
                  .then(res => {
                        const array = [];
                        res.forEach(item =>{
                              array.push(item.data)
                        })
                        setUserRecipe(array);
                  })
            })
            
      },[]);



      return <div className={s.container}>
            <NavBar/>
            <button onClick={() => navigate('/create/recipe')}>
                  Create recipe
            </button>
            {!userRecipe.length ? <h1 className={s.message}>No hay recetas creadas</h1> 
            : <RecipesContainer recipes={userRecipe} />}
      </div>
}

export default MyRecipes;