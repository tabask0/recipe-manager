"use client";

import { Recipe } from "../types";
import Link from "next/link";
import RecipeCard from "./RecipeCard";
import { useRecipes } from "../context/RecipeContext";
import { motion } from "framer-motion";

interface RecipeListProps {
  recipes: Recipe[];
  searchQuery: string;
}

const RecipeList = ({ recipes, searchQuery }: RecipeListProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useRecipes();

  const toggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      recipe.extendedIngredients?.some((ingredient) =>
        ingredient.name.toLowerCase().includes(searchQuery?.toLowerCase())
      )
  );

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-6 w-full max-w-6xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
              <RecipeCard key={index} recipe={recipe} />
            </Link>
            <button
              onClick={() => toggleFavorite(recipe)}
              className={`absolute top-2 right-2 p-2 rounded-full border-2 border-transparent bg-white ${
                isFavorite(recipe.id) ? "hover:bg-gray-500" : "hover:bg-red-500"
              }`}
            >
              {isFavorite(recipe.id) ? "❤️" : "🩶"}
            </button>
          </motion.div>
        ))
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          No recipes found matching your search criteria.
        </motion.p>
      )}
    </motion.div>
  );
};

export default RecipeList;
