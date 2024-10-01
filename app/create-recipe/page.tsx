"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleCreateRecipe = () => {
    if (!title || !ingredients || !instructions) {
      toast.error("Please fill in all fields before saving the recipe.");
      return;
    }

    const customId = Math.floor(Math.random() * 1000000000);
    const id = customId.toString();

    const customRecipes = JSON.parse(
      localStorage.getItem("customRecipes") || "[]"
    );
    const newRecipe = { id, title, ingredients, instructions };
    localStorage.setItem(
      "customRecipes",
      JSON.stringify([...customRecipes, newRecipe])
    );
    toast.success("Recipe created successfully!");

    setTitle("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <div className="flex flex-col items-center py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Create New Recipe</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full max-w-lg"
      />
      <textarea
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full max-w-lg"
      />
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 w-full max-w-lg"
      />
      <button
        onClick={handleCreateRecipe}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
      >
        Save Recipe
      </button>

      <ToastContainer />
    </div>
  );
}
