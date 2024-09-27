import React from 'react'
import { useRecipeFilterContext } from '../../contexts/recipeFilterContext'
import { Link } from 'react-router-dom';
import { useIndRecipeContext } from '../../contexts/indRecipeContext';
import ScrollToTopOnMount from '../common/scrollToTop/ScrollToTopOnMount';
import { useAuth } from '../../hookx/use-Auth';
import DashCard from './DashCard';

const AddedRecipes = () => {
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
         <div className='text-center text-xl md:text-2xl lg:text-3xl text-yellow-500 p-5'>Recipes you have added</div>
      {/* <p>Your total likes are {userLikes} </p>
      <p>Your total DisLikes are {userDisLikes} </p> */}
  <div className='flex flex-wrap'>
<DashCard recipes={userRecipes} />
  </div>
      
    </div>
  )
}

export default AddedRecipes
