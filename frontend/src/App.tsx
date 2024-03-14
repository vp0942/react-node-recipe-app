import {FormEvent, useRef, useState} from "react";
import "./App.css";
import * as api from "./api.ts";
import {Recipe} from "./types.ts";
import RecipeCard from "./components/RecipeCard.tsx";
import RecipeModal from "./components/RecipeModal.tsx";

const App = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const pageNumber = useRef(1); // useRef will not cause a re-render when it changes

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();// prevent the default form submission
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const newRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...newRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <input
          type="text"
          required placeholder="Enter a search term ..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}

        ></input>
        <button type="submit">Submit</button>
      </form>

      {recipes.map(
        (recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={()=>setSelectedRecipe(recipe)}/>
        )
      )}
      <button
        className="view-more"
        onClick={handleViewMoreClick}

      >View More
      </button>
      {selectedRecipe ? <RecipeModal/> : null}
    </div>
  )
}

export default App;