import React, { Suspense, useState } from "react";
import { useRecipeFilterContext } from "../../contexts/recipeFilterContext";
import Invitaion from "./Invitaion";
import Menu from "./menu/Menu";
import HomeSlider from "./HomeSlider";
import  { RecipeLoader } from "../common/loader";
import Contact from "../footer/Contact";
import ScrollToTopOnMount from "../common/scrollToTop/ScrollToTopOnMount";
import { Link } from "react-router-dom";
import { useIndRecipeContext } from "../../contexts/indRecipeContext";
import WeeklyRecipes from "./recipeOfTheWeek/WeeklyRecipes,";

function Home() {
  const [visibleRecipes, setVisibleRecipes] = useState(8); // Show 2 rows of 4 cards initially
  const { setIndividualRecipe } = useIndRecipeContext();
  const handleIndividualRecipe = (element) => {
    setIndividualRecipe(element);
  };

  const handleViewMore = () => {
    setVisibleRecipes(recipes.length); // Reveal all cards
  };
  const handleViewLess = () => {
    setVisibleRecipes(8); // Reveal all cards
  };
  const { recipes, dataAvail, } = useRecipeFilterContext();
  if(recipes.length < 0){
    return <div>No recipes found</div>
  }
  return (
    <div className="dark:bg-cardDark pb-10">
    <Suspense fallback={<RecipeLoader />}>
  {dataAvail ? (
    <div>
    <ScrollToTopOnMount/>
      <HomeSlider recipes={recipes} />
        <div className="text-center text-3xl font-semibold py-3 dark:text-text">
          Our Kitchen
        </div>
        <div className="flex flex-wrap justify-center gap-4">
        {recipes.slice(0, visibleRecipes).map((curElm) => (
          <Link
            to="/IndRecipe"
            className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[23%] 2xl:w-[14%] text-white border-4 border-black rounded-lg text-center shadow-lg cursor-pointer"
            onClick={() => handleIndividualRecipe(curElm)}
            key={curElm.id}
          >
            <div className="card relative flex justify-center items-center overflow-hidden">
              <img
                className="w-full h-[250px] 2xl:h-[350px] object-cover"
                src={curElm.imageUrls[0]}
                alt=""
              />
              <div className="cardContent">
                <div className="flex justify-between p-2">
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
      </div>
      {/* {visibleRecipes < recipes.length ? (
        <button
          onClick={handleViewMore}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View More
        </button>
      ) : 
     (
      <button
          onClick={handleViewLess}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View less
        </button>
     )} */}
      <Invitaion />
      {/* <WeeklyRecipes/> */}
      <Contact />
    </div>
  ) : (
    <RecipeLoader />
  )}
</Suspense>
    </div>
  );
}

export default Home;
