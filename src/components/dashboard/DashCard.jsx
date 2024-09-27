import React from 'react'
import { Link } from 'react-router-dom'
import { useIndRecipeContext } from '../../contexts/indRecipeContext';

function DashCard({recipes}) {
  const { setIndividualRecipe } = useIndRecipeContext();
  const handleIndividualRecipe = (curRecipe) => {
    setIndividualRecipe(curRecipe);
  };

  return (
   <div
        data-aos="fade-down"
     data-aos-duration="3000"
    className='flex justify-between items-center flex-wrap'>
     {recipes.map((recipe) => (
        <Link
          to="/IndRecipe"
          key={recipe.id}
          onClick={() => handleIndividualRecipe(recipe)}
          className="mb-4 w-[98%] md:w-[47%] lg:w-[30%] mx-auto flex flex-col flex-wrap bg-white dark:bg-cardDark shadow-xl dark:text-text rounded-lg  p-2 space-x-2 cursor-pointer h-96 overflow-hidden"
        >
          {console.log("FavRecipe is", recipe)}
          <div className="w-full mx-auto ">
            <img
              className="w-32 h-32 rounded-full mx-auto shadow-lg"
              src={recipe.imageUrls[0]}
              alt={recipe.name}
            />
          </div>
          <div className="w-full ">
            <h2 className="text-xl font-semibold mb-2 capitalize italic text-center mt-3">{recipe.name}</h2>
            <p className="text-gray-600 dark:text-gray-200 mb-4 ">{recipe.introduction}</p>
            {/* <div className="flex justify-between">
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
                <span>Likes : {recipe.likes}</span>
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
                <span>Dislikes : {recipe.disLikes}</span>
              </button>
            </div> */}
          </div>
        </Link>
      ))}
   </div>
  )
}

export default DashCard
