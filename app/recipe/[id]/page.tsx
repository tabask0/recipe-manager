import axios from "axios";
import { Recipe } from "../../../types";
import Image from "next/image";
import { notFound } from "next/navigation";

async function fetchRecipeDetails(id: number): Promise<Recipe> {
  const res = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  return res.data;
}

const fetchCustomRecipeById = (id: number): Recipe | null => {
  if (typeof window !== "undefined") {
    const storedRecipes = localStorage.getItem("customRecipes");
    if (storedRecipes) {
      const customRecipes = JSON.parse(storedRecipes);
      return customRecipes.find((recipe: Recipe) => recipe.id === id) || null;
    }
  }
  return null;
};

interface RecipeDetailsPageProps {
  params: { id: number };
}

const RecipeDetailsPage = async ({ params }: RecipeDetailsPageProps) => {
  let recipe: Recipe | null = fetchCustomRecipeById(params.id);

  if (!recipe) {
    recipe = await fetchRecipeDetails(params.id);
  }

  if (!recipe) {
    return notFound();
  }

  console.log(recipe);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          {recipe.title}
        </h1>

        {recipe.image && (
          <div className="w-full flex justify-center mb-6">
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={400}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        )}

        {recipe.readyInMinutes && (
          <p className="text-xl text-gray-700 text-center mb-8">
            <span className="font-semibold">Ready in:</span>{" "}
            {recipe.readyInMinutes} minutes
          </p>
        )}

        <div className="prose lg:prose-xl text-gray-800 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <div
            dangerouslySetInnerHTML={{ __html: recipe.instructions || "" }}
          ></div>
        </div>
        {recipe.extendedIngredients && (
          <p className="text-gray-700">
            Ingredients:{" "}
            {recipe.extendedIngredients
              ?.map((ingredient) => ingredient.name)
              .join(", ") || "No ingredients"}
          </p>
        )}

        {recipe.vegetarian || recipe.vegan || recipe.glutenFree ? (
          <div className="flex flex-wrap justify-center items-center gap-4">
            {recipe.vegetarian && (
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Vegetarian
              </span>
            )}
            {recipe.vegan && (
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Vegan
              </span>
            )}
            {recipe.glutenFree && (
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Gluten Free
              </span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
