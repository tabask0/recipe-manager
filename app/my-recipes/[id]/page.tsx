"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CustomRecipe } from "../../../types";

const fetchCustomRecipeById = (id: number): CustomRecipe | null => {
  const storedRecipes = localStorage.getItem("customRecipes");
  if (storedRecipes) {
    const customRecipes = JSON.parse(storedRecipes);
    return (
      customRecipes.find((recipe: CustomRecipe) => recipe.id === id) || null
    );
  }
  return null;
};

const saveCustomRecipe = (updatedRecipe: CustomRecipe) => {
  const storedRecipes = localStorage.getItem("customRecipes");
  const customRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];
  const updatedRecipes = customRecipes.map((recipe: CustomRecipe) =>
    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
  );
  localStorage.setItem("customRecipes", JSON.stringify(updatedRecipes));
};

const RecipeDetailsPage = ({ params }: { params: { id: number } }) => {
  const [recipe, setRecipe] = useState<CustomRecipe | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");

  useEffect(() => {
    const foundRecipe = fetchCustomRecipeById(params.id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setTitle(foundRecipe.title);
      setInstructions(foundRecipe.instructions);
      setIngredients(foundRecipe.ingredients);
    }
  }, [params.id]);

  const handleSave = () => {
    if (recipe) {
      const updatedRecipe = { ...recipe, title, instructions, ingredients };
      saveCustomRecipe(updatedRecipe);
      setRecipe(updatedRecipe);
      setIsEditing(false);
    }
  };

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        {isEditing ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
              Edit Recipe
            </h1>
            <h3>Title</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 mb-4 text-gray-400"
              placeholder="Recipe Title"
            />
            <h3>Instructions</h3>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border p-2 mb-4 text-gray-400"
              placeholder="Instructions"
            />
            <h3>Ingredients</h3>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border p-2 mb-4 text-gray-400"
              placeholder="Ingredients"
            />
            <motion.button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-14 text-center text-gray-800">
              {recipe.title}
            </h1>

            <div className="prose lg:prose-xl text-gray-800 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <p>{recipe.instructions}</p>
            </div>

            <div className="prose lg:prose-xl text-gray-800 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <p>{recipe.ingredients}</p>
            </div>

            <motion.button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Recipe
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
