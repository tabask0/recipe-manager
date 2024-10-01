import axios from "axios";

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export const fetchRecipes = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/complexSearch`, {
    params: { query, apiKey: API_KEY },
  });
  return response.data.results;
};
