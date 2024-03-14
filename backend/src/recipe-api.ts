const apiKey = process.env.API_KEY;

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

