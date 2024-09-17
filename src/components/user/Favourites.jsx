import React, { useEffect, useState } from "react";
import { ListenForFavourites } from "../../services/addToFavouritesService";
import { useRecipeFilterContext } from "../../contexts/recipeFilterContext";
import { Link } from "react-router-dom";
import { useIndRecipeContext } from "../../contexts/indRecipeContext";
import ScrollToTopOnMount from "../common/scrollToTop/ScrollToTopOnMount";

const Favourites = ({ uid }) => {
  const { recipes } = useRecipeFilterContext();
  const { setIndividualRecipe } = useIndRecipeContext();
  const [favourites, setFavourites] = useState([]);

  const favs = [...new Set(favourites.map((curElm) => curElm.id))];
  const favRecipes = recipes.filter((recipe) => {
    // Check if the recipe ID is in the 'favs' array and not equal to 'newId'
    return favs.includes(recipe.id);
  });

  useEffect(() => {
    const unsubscribe = ListenForFavourites(setFavourites, uid);
    return () => unsubscribe();
  }, [uid]);
  const handleIndividualRecipe = (curRecipe) => {
    setIndividualRecipe(curRecipe);
  };
  if (favRecipes.length === 0) {
    return (
      <div className="text-center text-3xl text-yellow-500 p-5">
        No Favourites yet
      </div>
    );
  }
  return (
    <div>
    <ScrollToTopOnMount/>
      <h2 className="text-center text-3xl text-yellow-500 p-5">
        Your Favourites
      </h2>
      <ul className=" flex flex-wrap w-[85%] mx-auto">
        {favRecipes.map((favRecipe) => (
          <Link
            to="/IndRecipe"
            key={favRecipe.id}
            onClick={() => handleIndividualRecipe(favRecipe)}
            className="mb-4  w-[30%] mx-auto flex bg-white rounded-lg shadow-md p-2 space-x-2 cursor-pointer"
          >
            {console.log("FavRecipe is", favRecipe)}
            <div className="w-[30%] ">
              <img
                className="w-full h-full"
                src={favRecipe.imageUrls[0]}
                alt={favRecipe.name}
              />
            </div>
            <div className="w-[70%] ">
              <h2 className="text-xl font-semibold mb-2">{favRecipe.name}</h2>
              <p className="text-gray-600 mb-4">{favRecipe.introduction}</p>
              <div className="flex justify-between">
                <button className="flex items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                  <span>Likes : {favRecipe.likes}</span>
                </button>
                <button className="flex items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Dislikes : {favRecipe.disLikes}</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};
export default Favourites;
