import React, { useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { IconContext } from "react-icons/lib";
import { useIndRecipeContext } from "../../../contexts/indRecipeContext";
import { updateRecipe } from "../../../firebase/Firebase";
import { useAddToFavouritesContext } from "../../../contexts/addFavouriteContext";
import { Tooltip } from "react-tooltip";

function RecipeLikes({ uid }) {
  const { indRecipe } = useIndRecipeContext();
  const { addToFavourites } = useAddToFavouritesContext();
  const [likes, setLikes] = useState(indRecipe.likes);
  const [disLikes, setDisLikes] = useState(indRecipe.disLikes);
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);

  const handleUpdateLikes = (id) => {
    setLiked(!liked);
    // if (!liked) {
      setLikes((likes) => likes + 1);
    // } else {
    //   if (likes > 0) {
    //     setLikes((likes) => likes - 1);
    //   }
    // }
    updateRecipe(id, likes, "likes");
  };
  const handleUpdateDisLikes = (id) => {
    setDisLiked(!disLiked);
    if (disLiked) {
      setDisLikes((disLikes) => disLikes + 1);
    } else {
      if (disLikes > 0) {
        setDisLikes((dislikes) => dislikes - 1);
      }
    }
    updateRecipe(id, disLikes, "disLikes");
  };
  const handleAddFavourites = (id, name) => {
    addToFavourites(id, uid, name);
    alert('recipe added to favorites');
  };

  return (
    <div>
      <IconContext.Provider
        value={{
          coloor: "rgb(31 41 55) ",
          className: "text-4xl cursor-pointer visited:text-red-300",
        }}
      >
        <div className="flex justify-center  space-x-4 pb-5 pt-2 ">
          <div
            data-tooltip-id="like"
            data-tooltip-content="like the Recipe"
            data-tooltip-place="top"
            data-tooltip-variant="info"
            data-tooltip-float="true"
            className={`relative dark:text-text ${
              liked ? "text-yellow-800 " : "text-gray-800"
            }`}
          >
            <AiOutlineLike onClick={() => handleUpdateLikes(indRecipe.id)} />
            <span className="absolute -bottom-5 right-3">{likes}</span>
            <Tooltip id="like" />
          </div>
          <div
            data-tooltip-id="dislike"
            data-tooltip-content="Dislike the Recipe"
            data-tooltip-place="top"
            data-tooltip-variant="error"
            data-tooltip-float="true"
            className={`relative dark:text-text${
              disLiked ? "text-yellow-800  " : "text-gray-800"
            }`}
          >
            <AiOutlineDislike
              onClick={() => handleUpdateDisLikes(indRecipe.id)}
            />
            <span className="absolute -bottom-5 right-3">{disLikes}</span>
            <Tooltip id="dislike" />
          </div>
          <div
            data-tooltip-id="fav"
            data-tooltip-content="Add this Recipe to your Favourites"
            data-tooltip-place="top"
            data-tooltip-variant="success"
            data-tooltip-float="true"
            onClick={() => handleAddFavourites(indRecipe.id, indRecipe.name)}
          >
            <CiHeart />
            <Tooltip id="fav" />
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default RecipeLikes;