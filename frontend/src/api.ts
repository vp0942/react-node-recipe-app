// Gets the recipes from the server
import {Recipe} from "./types.ts";

export const searchRecipes = async (searchTerm : string, page : number ) => {
  const url = new URL("http://localhost:5000/api/recipes/search");
  url.searchParams.append("searchTerm", searchTerm);
  url.searchParams.append("page", page.toString());

  // GET request to the server with the search term and page number
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Gets the recipe summary from the server
export const getRecipeSummary = async (recipeId : string) => {
  const url = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);

  // GET request to the server with the recipe id
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Gets the favorite recipes from the server
export const getFavoriteRecipes = async () => {
  const url = new URL("http://localhost:5000/api/recipes/favourite");

  // GET request to the server
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Adds a favorite recipe to the server
export const addFavouriteRecipe = async (recipe : Recipe) => {
  const url = new URL("http://localhost:5000/api/recipes/favourite");
  const body = {
    recipeId: recipe.id
  }

  // POST request to the server with the recipe id
  const response = await fetch(url,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

// Removes a favorite recipe from the server
export const removeFavouriteRecipe = async (recipe : Recipe) => {
  const url = new URL("http://localhost:5000/api/recipes/favourite");
  const body = {
    recipeId: recipe.id
  }

  // DELETE request to the server with the recipe id
  const response = await fetch(url,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

