// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
import "dotenv/config";
import * as RecipeAPI from './recipe-api';
import {PrismaClient} from '@prisma/client';


const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

// GET /api/recipes/search endpoint to search for recipes
app.get("/api/recipes/search", async (req, res) => {
  // GET http://localhost:5000/api/recipes/search?searchTerm=burgers&page=1
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);

  return res.json(results);
});

// GET /api/recipes/:recipeId/summary endpoint to get a summary of a recipe
app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  // GET http://localhost:5000/api/recipes/:recipeId/summary
  const recipeId = req.params.recipeId as string; // we use params here instead of query
  const results = await RecipeAPI.getRecipeSummary(recipeId);

  return res.json(results);
});

// POST /api/recipes/favourite endpoint to save a recipe as a favourite in the database
app.post("/api/recipes/favourite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    const favouriteRecipe = await prismaClient.favouriteRecipes.create(
      // id will be auto-created by the database
      {
        data: {
          recipeId: recipeId
        }
      }
    );
    return res.status(201).json(favouriteRecipe); // 201 is the status code for created successfully
  } catch (error) {
    console.error("Error creating favourite recipe", error);
    return res.status(500).json({error: "Error creating favourite recipe"}); // 500 is the status code for server error
    // We don't want to expose the error message to the client, so we send a generic error message
  }

});

// GET /api/recipes/favourite endpoint to get all the favourite recipes from the database
app.get("/api/recipes/favourite", async (req, res) => {
  try {
    const recipes = await prismaClient.favouriteRecipes.findMany();
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());

    // We use the getFavouriteRecipesByIDs function from the recipe-api.ts file to get the details of the favourite recipes
    const favourites = await RecipeAPI.getFavouriteRecipesByIDs(recipeIds);

    return res.json(favourites);

  } catch (error) {
    console.error("Error getting favourite recipes", error);
    return res.status(500).json({error: "Error getting favourite recipes"}); // 500 is the status code for server error
  }
})
// DELETE /api/recipes/favourite endpoint to remove a recipe from the favourites in the database
app.delete("/api/recipes/favourite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    await prismaClient.favouriteRecipes.delete({
      where: {
        recipeId: recipeId
      }
    });
    return res.status(204).send(); // 204 is the status code for no content
  } catch (error) {
    console.error("Error getting favourite recipes", error);
    return res.status(500).json({error: "Error getting favourite recipes"}); // 500 is the status code for server error
  }
})

app.listen(5000, () => {
  console.log("Server running on localhost: 5000");
});