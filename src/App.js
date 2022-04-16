import { Route, Routes } from 'react-router-dom';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import MyRecipes from './pages/MyRecipes/MyRecipes';
import MyFavorites from './pages/MyFavorites/MyFavorites';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />}>
				<Route path='/:firstFilter' element={<Home />} />
				<Route path='/:firstFilter/:secondFilter' element={<Home />} />
			</Route>
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />
			<Route path='/recipe/:id' element={<RecipeDetail />} />
			<Route path='/user/recipes' element={<MyRecipes />} />
			<Route path='/user/favorites' element={<MyFavorites />} />
			<Route path='/create/recipe' element={<CreateRecipe />} />
		</Routes>
	);
}

export default App;
