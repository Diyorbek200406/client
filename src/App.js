import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import CreateRecipe from './pages/create-recipe';
import SavedRecipes from './pages/saved-recipes';
import Auth from './pages/auth';
import Navbar from './components/navbar';

function App() {
	return (
		<div className='App min-vh-100 '>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/auth' element={<Auth />} />
					<Route path='/create-recipe' element={<CreateRecipe />} />
					<Route path='/saved-recipes' element={<SavedRecipes />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
