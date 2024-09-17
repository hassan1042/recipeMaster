import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useIndRecipeContext } from '../../../contexts/indRecipeContext';

const IndRecipeSlider = () => {
    const {indRecipe} = useIndRecipeContext();
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        slidesToScroll: 1,
        fade: true,
      };
  return (
   <>
     {
      indRecipe.imageUrls.length > 1 ?  <div>
      <Slider {...settings} className="overflow-hidden">
            {indRecipe.imageUrls.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  className="w-full h-[70vh] relative "
                  alt={index}
                />
                <p className="text-xl text-center py-3 font-semibold capitalize">
                  {indRecipe.name}
                </p>
              </div>
            ))}
          </Slider>
  </div> : <div><img
                  src={indRecipe.imageUrls[0]}
                  className="w-full h-[70vh] relative "
                  alt={indRecipe.name}
                /></div>
    }
   </>
   
  )
}

export default IndRecipeSlider
