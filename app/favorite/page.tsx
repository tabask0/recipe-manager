"use client";
import Link from "next/link";
import { useRecipes } from "../../context/RecipeContext";
import RecipeCard from "../../components/RecipeCard";
import { Recipe } from "../../types";

const FavoriteRecipesPage = () => {
  const { favorites, clearFavorites, removeFavorite, isFavorite } =
    useRecipes();

  const validFavorites = favorites.filter(
    (recipe) => recipe && recipe.id && recipe.title && recipe.image
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 lg:px-8">
      <div className="max-w-6xl w-full items-center">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Favorite Recipes
        </h1>

        {favorites.length > 0 && (
          <div className="flex justify-end w-full mb-4">
            <button
              onClick={clearFavorites}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Clear All Favorites
            </button>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {validFavorites.length > 0 ? (
            validFavorites.map((recipe: Recipe) => (
              <div className="relative" key={recipe.id}>
                <Link href={`/recipe/${recipe.id}`}>
                  <RecipeCard recipe={recipe} />
                </Link>
                <button
                  onClick={() => removeFavorite(recipe.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full border-2 border-transparent bg-white ${
                    isFavorite(recipe.id)
                      ? "hover:bg-gray-500"
                      : "hover:bg-red-500"
                  }`}
                >
                  {isFavorite(recipe.id) ? "❤️" : "🩶"}
                </button>
              </div>
            ))
          ) : (
            <p>No favorite recipes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteRecipesPage;
