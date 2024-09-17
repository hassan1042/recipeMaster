import React from "react";
import { NavLink } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <h3 className="text-lg font-bold">{recipe.name}</h3>
      <p>{recipe.introduction}</p>
      <NavLink to={`/recipe/${recipe.id}`} className="text-blue-500 underline">
        View Recipe
      </NavLink>
    </div>
  );
};

export default RecipeCard;
