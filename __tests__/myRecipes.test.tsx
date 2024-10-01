"use client";
import { render, screen, fireEvent } from "@testing-library/react";
import MyRecipesPage from "../app/my-recipes/page";
import { CustomRecipe } from "../types";

beforeEach(() => {
  localStorage.clear();
});

describe("MyRecipesPage", () => {
  test("renders My Recipes page with no recipes", () => {
    render(<MyRecipesPage />);

    expect(
      screen.getByText(/No recipes found. Please create one!/i)
    ).toBeInTheDocument();
  });

  test("renders My Recipes page with recipes", () => {
    const recipes: CustomRecipe[] = [
      {
        id: 1,
        title: "Test Recipe",
        ingredients: "Test Ingredients",
        instructions: "Test Instructions",
      },
      {
        id: 2,
        title: "Another Recipe",
        ingredients: "More Ingredients",
        instructions: "More Instructions",
      },
    ];
    localStorage.setItem("customRecipes", JSON.stringify(recipes));

    render(<MyRecipesPage />);

    expect(screen.getByText(/Test Recipe/i)).toBeInTheDocument();
    expect(screen.getByText(/Another Recipe/i)).toBeInTheDocument();
  });

  test("deletes a recipe", () => {
    const recipes: CustomRecipe[] = [
      {
        id: 1,
        title: "Test Recipe",
        ingredients: "Test Ingredients",
        instructions: "Test Instructions",
      },
    ];
    localStorage.setItem("customRecipes", JSON.stringify(recipes));
    render(<MyRecipesPage />);

    expect(screen.getByText(/Test Recipe/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Delete/i));

    expect(screen.queryByText(/Test Recipe/i)).not.toBeInTheDocument();
    expect(localStorage.getItem("customRecipes")).toBe("[]");
  });

  test("clears all recipes", () => {
    const recipes: CustomRecipe[] = [
      {
        id: 1,
        title: "Test Recipe",
        ingredients: "Test Ingredients",
        instructions: "Test Instructions",
      },
    ];
    localStorage.setItem("customRecipes", JSON.stringify(recipes));
    render(<MyRecipesPage />);

    fireEvent.click(screen.getByRole("button", { name: /Clear All Recipes/i }));

    expect(
      screen.getByText(/No recipes found. Please create one!/i)
    ).toBeInTheDocument();
    expect(localStorage.getItem("customRecipes")).toBeNull();
  });

  test("navigates to recipes", () => {
    render(<MyRecipesPage />);

    const link = screen.getByText(/Test Recipe/i);
    fireEvent.click(link);

    expect(window.location.pathname).toBe("/");
  });
});
