import {FormEvent, useEffect, useRef, useState} from "react";
import "./App.css";
import * as api from "./api.ts";
import {Recipe} from "./types.ts";
import RecipeCard from "./components/RecipeCard.tsx";
import RecipeModal from "./components/RecipeModal.tsx";
import {AiOutlineSearch} from "react-icons/ai";

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

  // onClick handler for the RecipeCard component that will be used to add a recipe to the favourites
  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.error(error);
    }
  }

  // onClick handler for the RecipeCard component that will be used to remove a recipe from the favourites
  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      // Remove the recipe from the favouriteRecipes array state using the filter Array method
      // Array.filter method returns a new array with all elements that pass the test implemented by the provided function
      const updatedRecipes = favouriteRecipes.filter((favRecipe) => favRecipe.id !== recipe.id);
      setFavouriteRecipes(updatedRecipes);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="app-container">
      <div className="header">
        <img src="/recipeBackGround.jpg" alt=""/>
        <div className="title">My Recipe App</div>
      </div>
      {/* Implementing the menu selection logic */}
      <div className="tabs">
        <h1
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        >Recipe Search</h1>
        <h1
          className={selectedTab === "favourites" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favourites")}
        >Favourites</h1>
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
            <button type="submit"><AiOutlineSearch size={25}/></button>
          </form>

          <div className="recipe-grid">
            {recipes.map(
              (recipe) => {
                // Check if the recipe is already a favourite (exists in the favouriteRecipes array state)
                // Array.some method returns true if at least one element in the array satisfies the condition
                // it takes a callback function as an argument
                const isFavourite = favouriteRecipes.some(
                  (favRecipe)=>recipe.id === favRecipe.id
                )

                return (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe)}
                    onFavouriteButtonClick={ isFavourite ? removeFavouriteRecipe : addFavouriteRecipe}
                    isFavourite={isFavourite}
                  />
                );
              }
            )}
          </div>

          <button
            className="view-more-button"
            onClick={handleViewMoreClick}
          >View More
          </button>
        </>
      )}

      {/* Display the favorites form only if the selected tab is "favorites" */}
      {selectedTab === "favourites" && (
        <div className="recipe-grid">
          {favouriteRecipes.map(
            (recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                onFavouriteButtonClick={removeFavouriteRecipe}
                isFavourite={true}
              />
            )
          )}
        </div>
      )}

      {selectedRecipe ?
        <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)}/> : null}
    </div>
  )
}

export default App;