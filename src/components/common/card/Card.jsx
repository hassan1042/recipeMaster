import React from 'react'
import { Link } from 'react-router-dom'
import { useIndRecipeContext } from '../../../contexts/indRecipeContext';
import './card.css';

function Card({recipes}) {
    const { setIndividualRecipe } = useIndRecipeContext();
    const handleIndividualRecipe = (element) => {
      setIndividualRecipe(element);
    };
  return (
  <>
      {recipes.map((curElm) => (
        <Link
          to="/IndRecipe"
          className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[23%]  2xl:w-[14%] text-white border-4 border-black rounded-lg  text-center  shadow-lg cursor-pointer "
          onClick={() => handleIndividualRecipe(curElm)}
          key={curElm.id}
        >
          <div className="card relative flex justify-center items-center overflow-hidden">
            <img
              className="w-full  h-[250px] 2xl:h-[350px] object-cover  "
              src={curElm.imageUrls[0]}
              alt=""
            />
            <div className="cardContent">
              <div className="flex justify-between p-2 ">
                <label htmlFor="healthMeter" className="flex items-center text-[12px]">
                  Health Meter:
                  <input
                    name="healthMeter"
                    type="range"
                    value={curElm.healthPercentage}
                    className="mx-2 w-10 text-[10px]"
                  />
                  {curElm.healthPercentage}%
                </label>
                {/* <div className="text-[15px]">{curElm.rating}/5</div> */}
              </div>
              <p className="cardTitle text-md">{curElm.name}</p>
              <p className="cardDescription text-white text-sm">
                {curElm.introduction}
              </p>
            </div>
          </div>
        </Link>
      ))}
  </>
  )
}

export default Card
