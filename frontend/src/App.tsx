import {FormEvent, useEffect, useRef, useState} from "react";
import "./App.css";
import * as api from "./api.ts";
import {Recipe} from "./types.ts";
import RecipeCard from "./components/RecipeCard.tsx";
import RecipeModal from "./components/RecipeModal.tsx";

// Define the type for the selected tab
type Tabs = "search" | "favourites";

const App = () => {
  // Try returning the same types from the API (back-end, end-points) and use them in the front-end
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1); // useRef will not cause a re-render when it changes

  // Fetch the favourite recipes when the app loads for the first time
  // This is why we use the useEffect hook with an empty dependency array.
  // useEffect takes s synchronous function as its first argument
  // we can use the async/await syntax to make asynchronous calls
  // inside the synchronous function.
  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const favouritesRecipes = await api.getFavoriteRecipes();
        setFavouriteRecipes(favouritesRecipes.result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFavouriteRecipes();
  }, [])

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
      {/* Implementing the menu selection logic */}
      <div className="tabs">
        <h1 onClick={() => setSelectedTab("search")}>Recipe Search</h1>
        <h1 onClick={() => setSelectedTab("favourites")}>Favourites</h1>
      </div>
      {/* Display the search form only if the selected tab is "search" */}
      {selectedTab === "search" && (
        <>
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
              <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)}/>
            )
          )}
          <button
            className="view-more"
            onClick={handleViewMoreClick}

          >View More
          </button>
        </>
      )}

      {/* Display the favorites form only if the selected tab is "favorites" */}
      {selectedTab === "favourites" && (
        <>
          {favouriteRecipes.map(
            (recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)}/>
            )
          )}
        </>
      )}

      {selectedRecipe ?
        <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)}/> : null}
    </div>
  )
}

export default App;