"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Recipe, RecipeContextProps } from "../types";

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipesState] = useState<Recipe[]>([]);
  const [favorites, setFavoritesState] = useState<Recipe[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteRecipes");
    if (storedFavorites) {
      setFavoritesState(JSON.parse(storedFavorites));
    }
  }, []);

  const addRecipe = (recipe: Recipe) => {
    setRecipesState((prevRecipes) => [recipe, ...prevRecipes]);
  };

  const setRecipes = (newRecipes: Recipe[]) => {
    setRecipesState(newRecipes);
  };

  const clearRecipes = () => {
    setRecipesState([]);
    localStorage.removeItem("customRecipes");
  };

  const addFavorite = (recipe: Recipe) => {
    setFavoritesState((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, recipe];
      localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (recipeId: number) => {
    setFavoritesState((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.id !== recipeId
      );
      localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const clearFavorites = () => {
    setFavoritesState([]);
    localStorage.removeItem("favoriteRecipes");
  };

  const isFavorite = (recipeId: number) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        addRecipe,
        setRecipes,
        clearRecipes,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
};
