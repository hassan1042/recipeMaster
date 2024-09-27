import React, { useEffect, useState } from "react";
import { ListenForFavourites } from "../../services/addToFavouritesService";
import { useRecipeFilterContext } from "../../contexts/recipeFilterContext";
import { Link } from "react-router-dom";
import { useIndRecipeContext } from "../../contexts/indRecipeContext";
import ScrollToTopOnMount from "../common/scrollToTop/ScrollToTopOnMount";
import DashCard from "../dashboard/DashCard";

const Favourites = ({ uid }) => {
  const { recipes } = useRecipeFilterContext();
  const { setIndividualRecipe } = useIndRecipeContext();
  const [favourites, setFavourites] = useState([]);



  useEffect(() => {
    const unsubscribe = ListenForFavourites(setFavourites, uid);
    console.log(uid)
    return () => unsubscribe();
  }, [uid]);
  const handleIndividualRecipe = (curRecipe) => {
    setIndividualRecipe(curRecipe);
  };

  const favs = [...new Set(favourites.map((curElm) => curElm.id))];
  const favRecipes = recipes.filter((recipe) => {
    // Check if the recipe ID is in the 'favs' array and not equal to 'newId'
    return favs.includes(recipe.id);
  });


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
        {/* {favRecipes.map((favRecipe) => (
          <Link
            to="/IndRecipe"
            key={favRecipe.id}
            onClick={() => handleIndividualRecipe(favRecipe)}
            className="mb-4  w-[30%] mx-auto flex flex-col bg-white rounded-lg shadow-md p-2 space-x-2 cursor-pointer"
          >
            {console.log("FavRecipe is", favRecipe)}
            <div className="w-full mx-auto ">
              <img
                className="w-32 h-32 rounded-full mx-auto "
                src={favRecipe.imageUrls[0]}
                alt={favRecipe.name}
              />
            </div>
            <div className="w-full ">
              <h2 className="text-xl font-semibold mb-2 capitalize italic text-center mt-3">{favRecipe.name}</h2>
              <p className="text-gray-600 mb-4">{favRecipe.introduction}</p>
          
            </div>
          </Link> 
        ))}
          */}
      <ul className=" flex flex-wrap w-[85%] mx-auto">

          <DashCard recipes={favRecipes} />``
      </ul>
    </div>
  );
};
export default Favourites;
