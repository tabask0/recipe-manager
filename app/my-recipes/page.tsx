"use client";

import { useEffect, useState } from "react";
import { CustomRecipe } from "../../types";
import { motion } from "framer-motion";
import Link from "next/link";

const fetchCustomRecipes = (): CustomRecipe[] => {
  if (typeof window !== "undefined") {
    const storedRecipes = localStorage.getItem("customRecipes");
    if (storedRecipes) {
      return JSON.parse(storedRecipes);
    }
  }
  return [];
};

const MyRecipesPage = () => {
  const [customRecipes, setCustomRecipes] = useState<CustomRecipe[]>([]);

  useEffect(() => {
    setCustomRecipes(fetchCustomRecipes());
  }, []);

  const handleRemoveRecipe = (id: number) => {
    const updatedRecipes = customRecipes.filter((recipe) => recipe.id !== id);
    setCustomRecipes(updatedRecipes);
    localStorage.setItem("customRecipes", JSON.stringify(updatedRecipes));
  };

  const handleClearAllRecipes = () => {
    setCustomRecipes([]);
    localStorage.removeItem("customRecipes");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold mb-4">My Recipes</h1>

      <div className="flex flex-row gap-4 my-6 items-center">
        <Link href="/">
          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
        </Link>
        <Link href="/create-recipe">
          <motion.button
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create New Recipe
          </motion.button>
        </Link>

        {customRecipes.length > 0 && (
          <motion.button
            onClick={handleClearAllRecipes}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All Recipes
          </motion.button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        {customRecipes.length > 0 ? (
          customRecipes.map((recipe, index) => (
            <div
              key={index}
              className="relative bg-white  p-4 mt-10 rounded-lg shadow-md w-[300px] border-2 border-transparent hover:shadow-xl transition duration-300"
            >
              <Link
                key={recipe.id}
                href={`/my-recipes/${recipe.id}`}
                className="text-blue-500 mt-2"
              >
                <h2 className="text-3xl font-bold mb-3">{recipe.title}</h2>
                <p className="text-gray-700">
                  <span className="font-bold">Instructions: </span>
                  {recipe.instructions?.substring(0, 100)}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Ingredients: </span>
                  {recipe.ingredients}
                </p>
              </Link>
              <motion.button
                onClick={() => handleRemoveRecipe(recipe.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 bottom-2 mt-4 bg-red-500 border-4 border-white text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </motion.button>
            </div>
          ))
        ) : (
          <p className="my-10">No recipes found. Please create one!</p>
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
