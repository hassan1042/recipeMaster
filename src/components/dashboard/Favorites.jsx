import React from 'react'
import { useRecipeFilterContext } from '../../contexts/recipeFilterContext'
import { Link } from 'react-router-dom';
import { useIndRecipeContext } from '../../contexts/indRecipeContext';
import ScrollToTopOnMount from '../common/scrollToTop/ScrollToTopOnMount';
import { useAuth } from '../../hookx/use-Auth';

const Favourites = () => {
    const { currentUser } = useAuth();

  const uid = currentUser ? currentUser.uid : null;

    const {recipes} = useRecipeFilterContext();
    const { setIndividualRecipe } = useIndRecipeContext();
    const userRecipes = recipes.filter((curElm) => (
    curElm.uid === uid
    ));
    const handleIndividualRecipe = (curRecipe) => {
        setIndividualRecipe(curRecipe)
    }
    const userLikes = userRecipes.reduce((accumulator, recipe) => {
        return accumulator + recipe.likes;
      }, 0);
      const userDisLikes = userRecipes.reduce((accumulator, recipe) => {
        return accumulator + recipe.disLikes;
      }, 0);
      
    if(userRecipes.length === 0){
        return <div className='text-center text-3xl text-yellow-500 p-5'>No Recipes Added Yet yet</div>
     }
  return (
    <div className='w-[90%] mx-auto'>
    <ScrollToTopOnMount/>
         <div className='text-center text-3xl text-yellow-500 p-5'>Recipes you have added</div>
      {/* <p>Your total likes are {userLikes} </p>
      <p>Your total DisLikes are {userDisLikes} </p> */}
  <div className='flex flex-wrap'>
  {userRecipes && userRecipes.map((userRecipe) => (
    <Link
    to="/IndRecipe" 
    key={userRecipe.id}
    onClick={() => handleIndividualRecipe(userRecipe)}
     className="mb-4   mx-auto flex bg-white rounded-lg shadow-lg p-3 w-[100%] md:w-[50%] lg:w-[33%] 2xl:w-[25%]    space-x-2 cursor-pointer">
    <div
     className="w-[30%] "
    >
    <img
    className='w-full h-full'
     src={userRecipe.imageUrls[0]} alt={userRecipe.name} />

    </div>
      <div className="w-[70%] flex flex-col justify-between ">
        <h2 className="text-xl font-semibold mb-2 text-center">{userRecipe.name}</h2>
        <p className="text-gray-600 mb-4">{userRecipe.introduction}</p>
        {/* LIkes and Dislikes */}
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
            <span>Likes : {userRecipe.likes}</span>
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
            <span>Dislikes : {userRecipe.disLikes}</span>
          </button>
        </div>
      </div>
    </Link>
  ))}
  </div>
      
    </div>
  )
}

export default Favourites
