"use client";

import Image from "next/image";
import Link from "next/link";
import { RecipeCardProps } from "../types";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe, link = false }: RecipeCardProps) => {
  const content = (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md w-[300px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {recipe.image && (
        <Image
          src={recipe.image || "/image.svg"}
          alt={recipe.title || "Recipe Image"}
          width={300}
          height={200}
          className="rounded-lg object-cover mb-4"
        />
      )}
      <h2 className="text-xl font-bold text-black">{recipe.title}</h2>
      {recipe.ingredients && (
        <p className="text-gray-700">Ingredients: {recipe.ingredients}</p>
      )}
      {recipe.instructions && (
        <p className="text-gray-700">
          Instructions:{" "}
          {recipe.instructions.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100)}
        </p>
      )}
      {recipe.summary && (
        <p className="text-gray-700">{recipe.summary.substring(0, 100)}...</p>
      )}
    </motion.div>
  );

  return link ? (
    <Link href={`/recipes/${recipe.id}`}>
      <a>{content}</a>
    </Link>
  ) : (
    content
  );
};

export default RecipeCard;
