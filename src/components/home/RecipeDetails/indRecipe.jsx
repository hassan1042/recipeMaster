import React, { useState } from "react";
import { useIndRecipeContext } from "../../../contexts/indRecipeContext";
import { removeRecipe } from "../../../firebase/Firebase";
import RecipeLikes from "./RecipeLikes";
import DialogueBox from "../../common/dialogueBox/DialogueBox";
import Rating from "./rating/Rating";
import IndRecipeSlider from "./IndRecipeSlider";
import RecipeComments from "./RecipeComments";
import RecipePublisher from "../../common/recipePublisher/recipePublisher";
import ScrollToTopOnMount from "../../common/scrollToTop/ScrollToTopOnMount";
import IndRecipeVideo from "./IndRecipeVideo";

function IndRecipe({ uid, user }) {
  const { indRecipe } = useIndRecipeContext();
  const [isRecipeVisible, setIsRecipeVisible] = useState(false);
  const handleDelete = (recipeKey) => {
    setIsRecipeVisible(true);
    removeRecipe(recipeKey);
  };
  return (
    <div className="dark:bg-cardDark">
      <ScrollToTopOnMount />
      {/* Nav */}
      <section className="w-[97%]  mx-auto dark:text-text">
        {indRecipe ? (
          <div className="text-center p-2 dark:text-text ">
            <IndRecipeSlider />
            <RecipeLikes uid={uid} />
            <div>
              <p
                className={`${
                  indRecipe.uid === uid
                    ? "cursor-pointer py-2 mx-auto   px-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 shadow-lg w-40 "
                    : "hidden"
                }`}
                onClick={() => handleDelete(indRecipe.id)}
              >
                {indRecipe.uid === uid ? "Delete the Recipe?" : ""}
              </p>
              {isRecipeVisible && (
                <DialogueBox
                  isRecipeVisible={isRecipeVisible}
                  setIsRecipeVisible={setIsRecipeVisible}
                  dialogueText={" Recipe Deleted successfully"}
                  linkTo={"/"}
                />
              )}
              {/**Ingredients */}
              <div className="my-5 space-y-4 ">
                <p className="text-lg text-gray-800 dark:text-gray-300 font-semibold ">
                  Ingredients:
                </p>
                <ul className="flex flex-wrap gap-2  text-gray-700 dark:text-text justify-center">
                  {indRecipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ease-in-out font-semibold"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-lg text-gray-800 dark:text-gray-300 font-semibold mb-2">
                Crafting:
              </p>
              <p className="text-gray-700 dark:text-text italic lg:my-5 my-3">
                {indRecipe.making}
              </p>
            </div>

            {/* <Rating/>    */}

{
 ( indRecipe.videoUrl || indRecipe.videoLink) ?
  <IndRecipeVideo indRecipe={indRecipe}/> : 
  <p>no videos available</p>

}
            <RecipeComments recipeId={indRecipe.id} uid={uid}/>
            <div className="container mx-auto p-4">
              {/* Other recipe details */}
              <RecipePublisher
                userName={indRecipe.userName}
                userImg={indRecipe.userImg}
                // userDescription={indRecipe.userDescription || "No description available"}
              />
              {/* Other recipe details */}
            </div>
          </div>
        ) : (
          <div className="text-3xl text-yellow-500 text-center p-10">
            Something went wrong please reload
          </div>
        )}
      </section>
    </div>
  );
}

export default IndRecipe;
