// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
import "dotenv/config";
import * as RecipeAPI from './recipe-api';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
  // GET http://localhost:5000/api/recipes/search?searchTerm=burgers&page=1
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);

  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  // GET http://localhost:5000/api/recipes/649195/summary
  const recipeId = req.params.recipeId as string; // we use params here instead of query
  const results = await RecipeAPI.getRecipeSummary(recipeId);

  return res.json(results);
});

app.listen(5000, () => {
  console.log("Server running on localhost: 5000");
});