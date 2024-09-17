import React, { useState } from 'react'
import { updateRecipe } from '../../../../firebase/Firebase';
import { useIndRecipeContext } from '../../../../contexts/indRecipeContext';
import "./rating.css";

const Rating = () => {
    const { indRecipe } = useIndRecipeContext();
    const [rating, setRating] = useState(0);
    const handleAddRating = (id) => {
        updateRecipe(id, rating, "rating");
      };
  return (
    <div>
         <p>liked the recipe? rate it!</p>
            <div onClick={() => handleAddRating(indRecipe.id)} class="rating">
              <input
                type="radio"
                id="star5"
                name="rating"
                value="5"
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="star5"></label>
              <input
                type="radio"
                id="star4"
                name="rating"
                value="4"
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="star4"></label>
              <input
                type="radio"
                id="star3"
                name="rating"
                value="3"
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="star3"></label>
              <input
                type="radio"
                id="star2"
                name="rating"
                value="2"
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="star2"></label>
              <input
                type="radio"
                id="star1"
                name="rating"
                value="1"
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="star1"></label>
              <p>{setRating.rating}</p>
            </div>
    </div>
  )
}

export default Rating
