#Recipe Manager App
This is a Recipe Manager app built with Next.js (using the App Router), TypeScript, Framer Motion, and the Spoonacular API for fetching random recipes. Users can create, view, and save their favorite recipes. Favorites are persisted using React Context and localStorage.

##Project Architecture
The app is organized into several key folders:

1. app/
   This directory contains all pages related to the App Router in Next.js.
   create-recipe/page.tsx: The page where users can create custom recipes.
   favorite/page.tsx: The page that displays the user's favorite recipes.
   my-recipes/page.tsx: Displays all custom recipes created by the user.
   recipe/[id]/page.tsx: Dynamic route to show details of a specific recipe.
   layout.tsx: Global layout for the application.
   globals.css: Global CSS styles.

2. components/
   RecipeCard.tsx: Reusable component that displays a recipe card with the recipe’s title, image, and description.
   RecipeList.tsx: Displays a list of recipes. Used in multiple places, including the favorites and my-recipes pages.

3. context/
   RecipeContext.tsx: Contains the React Context used for managing global state such as recipes and favorites. Favorites are persisted using localStorage.

4. utils/
   api.ts: Utility functions to interact with the Spoonacular API.

5. public/
   image.svg: Placeholder image used for recipes without an image.

6. tests/
   myRecipes.test.tsx: Contains unit tests for the My Recipes functionality, ensuring components and features work as expected.

7. utils/
   Contains utility files, such as API interaction methods.

##Other Files

.env.local: Stores the API key for the Spoonacular API. You’ll need to add this file for the app to function correctly.

jest.config.ts: Jest configuration for running tests.

tailwind.config.ts: Tailwind CSS configuration file.

setupTests.ts: Configuration file for setting up Jest and React Testing Library.

#Setup Instructions

##Prerequisites
Node.js: Make sure you have Node.js installed.
npm or yarn: You’ll also need npm (or yarn) to install dependencies.
Installation
###Clone this repository:

git clone https://github.com/your-repo/recipe-manager.git

cd recipe-manager

Install dependencies:

npm install

###Set up environment variables:

###Create a .env.local file at the root of the project and add your Spoonacular API key:

makefile

NEXT_PUBLIC_SPOONACULAR_API_KEY=your-api-key-here

###Start the development server:

npm run dev

###Open the app in your browser at http://localhost:3000.

##Folder Structure Overview

├── app/ # Pages for Next.js App Router
│ ├── create-recipe/
│ ├── favorite/
│ ├── my-recipes/
│ ├── recipe/[id]/
│ ├── layout.tsx # Global layout
│ ├── page.tsx # Entry point (Home Page)
│ └── globals.css # Global styles
├── components/ # Reusable components
│ ├── RecipeCard.tsx
│ └── RecipeList.tsx
├── context/ # React Context for global state
│ └── RecipeContext.tsx
├── public/ # Static assets
│ └── image.svg
├── utils/ # Utility functions (API interactions)
│ └── api.ts
├── \_tests\_\_/ # Unit tests
│ └── myRecipes.test.tsx
├── .env.local # Environment variables (API key)
├── package.json # Project metadata and dependencies
├── jest.config.ts # Jest configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── README.md # Project documentation

##Running Tests
##This project uses Jest and React Testing Library for unit tests.

###To run the tests:

npm run test

##Future Enhancements

###User Authentication: Add user authentication to allow users to save their recipes across devices.
###Pagination: Add pagination or infinite scrolling for large lists of recipes.
###Search Autocomplete: Enhance the search feature with autocomplete suggestions from the Spoonacular API.(nop)
