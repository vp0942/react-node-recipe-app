const apiKey = process.env.API_KEY;

// Function to search for recipes using the Spoonacular API
// https://spoonacular.com/food-api/docs#Search-Recipes-Complex
export const searchRecipes = async (searchTerm: string, page: number) => {
  if(!apiKey) {
    throw new Error('API key not found');
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  const queryParams = {
    apiKey,
    query: searchTerm,
    number: "10",
    offset: ((page - 1) * 10).toString(),
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url);
    const responseJson = await searchResponse.json();
    return responseJson;
  } catch (error) {
    console.error("Error searching for recipes", error);
    return null;
  }
};

// Function to get a summary of a recipe using the Spoonacular API
// https://spoonacular.com/food-api/docs#Summarize-Recipe
export const getRecipeSummary = async (recipeId: string) => {
  if(!apiKey) {
    throw new Error('API key not found');
  }

  const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);

  const queryParams = {
    apiKey,
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const summaryResponse = await fetch(url);
    const responseJson = await summaryResponse.json();
    return responseJson;
  }catch (error) {
    console.error("Error getting recipe summary", error);
    return null;
  }
};

// Function to get favourite recipes from the database
// https://spoonacular.com/food-api/docs#Get-Recipe-Information-Bulk
export const getFavouriteRecipesByIDs = async (ids: string[]) => {
  if(!apiKey) {
    throw new Error('API key not found');
  }

  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");

  const params = {
    apiKey,
    ids: ids.join(","),
  };

  url.search = new URLSearchParams(params).toString();

  const searchResponse = await fetch(url);
  const json = await searchResponse.json();

  return {result: json};
}

