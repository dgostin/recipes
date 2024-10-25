import React from "react";
import { useRecipeStore, useAppStore } from "./store";

const Recipes = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const formSubmitted = useAppStore((state) => state.formSubmitted);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {recipes.map((recipe, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow-lg border-2 border-stone-400"
          >
            <h2 className="text-xl font-bold mb-2">{recipe.recipe.label}</h2>
            <img
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
              className="w-full h-40 object-cover rounded-md border-indigo-800 border-[1px] mb-2"
            />

            <h2 className="mb-1 text-md font-semibold">Cuisine Type</h2>
            {recipe.recipe.cuisineType.map((type, i) => (
              <h3 key={i} className="text-sm text-gray-800 ml-2 mb-2">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </h3>
            ))}
            <hr className="mb-2" />

            <h2 className="text-md mb-1 font-semibold">Ingredients</h2>
            <ul className="text-xs ml-2 mb-2">
              {recipe.recipe.ingredients.map((ingredient, i) => (
                <li className="mb-1 font-semibold" key={i}>
                  - {ingredient.food}
                </li>
              ))}
            </ul>
            <hr className="mb-2" />

            <a
              href={recipe.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 font-bold text-sm text-blue-700"
            >
              View full recipe on{" "}
              <span className="text-black">
                {getDomainFromUrl(recipe.recipe.url)}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const getDomainFromUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace("www.", "");
  } catch (error) {
    console.error("Invalid URL:", url);
    return null;
  }
};

export default Recipes;
