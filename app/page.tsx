"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import RecipeList from "../components/RecipeList";
import { useRecipes } from "../context/RecipeContext";

const HomePage = () => {
  const { recipes, setRecipes } = useRecipes();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  });

  const fetchRecipes = async () => {
    setIsLoading(true);
    setError(null);

    const dietaryFilters = [];
    if (dietaryPreferences.vegetarian) dietaryFilters.push("vegetarian");
    if (dietaryPreferences.vegan) dietaryFilters.push("vegan");
    if (dietaryPreferences.glutenFree) dietaryFilters.push("gluten-free");

    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&number=20&tags=${dietaryFilters.join(",")}`
      );
      setRecipes(res.data.recipes);
    } catch (err: unknown) {
      console.log(err);
      setError("Failed to load recipes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex flex-col items-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl text-black font-bold mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Recipe Manager
      </motion.h1>

      <motion.div
        className="flex flex-row gap-4 py-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a recipe..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full max-w-lg"
        />
        <motion.button
          onClick={fetchRecipes}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Search
        </motion.button>
      </motion.div>

      <motion.div
        className="flex gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <label className="flex items-center">
          <input
            className="mx-[3px]"
            type="checkbox"
            checked={dietaryPreferences.vegetarian}
            onChange={() =>
              setDietaryPreferences((prev) => ({
                ...prev,
                vegetarian: !prev.vegetarian,
              }))
            }
          />
          Vegetarian
        </label>
        <label className="flex items-center">
          <input
            className="mx-[3px]"
            type="checkbox"
            checked={dietaryPreferences.vegan}
            onChange={() =>
              setDietaryPreferences((prev) => ({
                ...prev,
                vegan: !prev.vegan,
              }))
            }
          />
          Vegan
        </label>
        <label className="flex items-center">
          <input
            className="mx-[3px]"
            type="checkbox"
            checked={dietaryPreferences.glutenFree}
            onChange={() =>
              setDietaryPreferences((prev) => ({
                ...prev,
                glutenFree: !prev.glutenFree,
              }))
            }
          />
          Gluten-Free
        </label>
      </motion.div>

      <motion.div
        className="flex flex-row gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
      >
        <motion.button
          onClick={fetchRecipes}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Random Recipes
        </motion.button>

        <Link href="/my-recipes">
          <motion.button
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            My Recipes
          </motion.button>
        </Link>

        <Link href="/favorite">
          <motion.button
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Favorite
          </motion.button>
        </Link>
      </motion.div>

      {isLoading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading recipes...
        </motion.p>
      )}

      {error && (
        <motion.p
          className="text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}

      {recipes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <RecipeList recipes={recipes} searchQuery={searchQuery} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default HomePage;
