export interface Recipe {
  id: number;
  title: string;
  image?: string;
  summary?: string;
  instructions?: string;
  readyInMinutes?: number;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  ingredients: string[];
  extendedIngredients?: {
    id: number;
    name: string;
  }[];
}

export interface CustomRecipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}

export interface SearchResult {
  id: number;
  title: string;
}

export interface RecipeCardProps {
  recipe: Recipe;
  link?: boolean;
}

export interface RecipeContextType {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
}

export interface RecipeContextProps {
  recipes: Recipe[];
  favorites: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  setRecipes: (recipes: Recipe[]) => void;
  clearRecipes: () => void;
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeId: number) => void;
  isFavorite: (recipeId: number) => boolean;
  clearFavorites: () => void;
}
