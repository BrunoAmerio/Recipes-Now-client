import s from './RecipesContainer.module.scss';


//COMPONENTES 
import RecipeContainer from './Recipe/RecipeContainer';

const RecipesContainer = ( {recipes, favorites} ) =>{

      return <div className={s.container}>
            {recipes ? recipes.map(item =>{
                  return <RecipeContainer recipe={item} favorites={favorites} key={item.id}/>
            })
            : 'No hay recetas para mostrar'}
      </div>
}

export default RecipesContainer;