import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useIndRecipeContext } from '../../contexts/indRecipeContext';

function HomeSlider({recipes}) {
  const {setIndividualRecipe} = useIndRecipeContext();
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        slidesToScroll: 1,
        fade: true,
      };
      const handleIndividualRecipe = (curRecipe) => {
        setIndividualRecipe(curRecipe);
      }
  return (
    <div>
     <div className="text-center text-2xl font-semibold py-3 dark:text-text">
                  Choose your favorite recipe from our vast collection
                </div>
      <Slider {...settings} className="overflow-hidden">
            {
              recipes &&
              recipes.map((recipe) => (
              <Link
              to="IndRecipe"
              className='cursor-pointer'
              onClick={() => handleIndividualRecipe(recipe)}
               key={recipe.id}>
              {recipe.imageUrls && recipe.imageUrls.length > 0 && (
  <img
    className="w-full h-[350px] 2xl:h-[450px] object-cover"
    src={recipe.imageUrls[0]}
    alt=""
  />
)}
                <p className="text-xl text-center py-3 font-semibold dark:text-text">
                  {recipe.name}
                </p>
              </Link>
            ))}
          </Slider>
    </div>
  )
}

export default HomeSlider
