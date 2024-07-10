import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';

import Start_here from './pages/start_here';

import LogSignup from './pages/logsignup';

import RecipeList from './Components/RecipeList';
import AddRecipe from './pages/add-recipe';
import Axios from 'axios';
import recipesData from './data/recipes';
import AddRecipeForm from './Components/AddRecipeForm';

const YummyYard = () => {
  const [text, setText] = useState("");
  const [recipes, setRecipes] = useState(recipesData);
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);

  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/yummyYard");
      setText(response.data.Response);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
    setFilteredRecipes([...recipes, newRecipe]); // Update filtered recipes as well
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/start_here" element={<Start_here />} />
          <Route path="/signup" element={<LogSignup />} />
          <Route path="/recipes" element={<RecipeList recipes={filteredRecipes} />} />
          <Route path="/add-recipe" element={<AddRecipeForm onAddRecipe={handleAddRecipe} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default YummyYard;