import React from 'react'
import { useRecipeFilterContext } from '../../contexts/recipeFilterContext';


function SubCatNav() {
  const { recipes , subCat } = useRecipeFilterContext();

    const uniqueSubCategories = [
        ...new Set(recipes.map((curElm) => curElm.subCategory)),
      ];

      const handleCatSub = (category) => {
        subCat(category);
       
      };
  return (
    <div className=" text-center text-[1.1em] fixed z-[2]  w-full bg-[#48CD9A] dark:bg-bgPrimaryDark">
    {uniqueSubCategories.map((curElm, ind) => (
      <button
        className="py-2 px-4 capitalize text-white focus:text-pink-600"
        key={ind}
        onClick={() => handleCatSub(curElm)}
      >
        {curElm}
      </button>
    ))}
  </div>
  )
}

export default SubCatNav
