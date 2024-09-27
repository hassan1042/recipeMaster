import React from "react";
import { useRecipeFilterContext } from "../contexts/recipeFilterContext";
import Menu from "./home/menu/Menu";
import SubCatNav from "./header/SubCatNav";
import ScrollToTopOnMount from "./common/scrollToTop/ScrollToTopOnMount";

const FilteredRecipes = () => {
  const { filteredRecipes, selectedCat } = useRecipeFilterContext();

  return (
    <div className="pt-36">
    <ScrollToTopOnMount/>
    {/* The Sub Category Navbar */}
      <SubCatNav />
  {/* The Name of Selected Category */}
      <div className="z-8 text-3xl flex-grow text-center font-bold text-yellow-500 pt-14 p-5 max-md:pt-24  dark:bg-cardDark">
        {selectedCat}
      </div>
      {/* Content of Menu Updated according to the Filtered Recipe */}
      <Menu recipes={filteredRecipes} />
    </div>
  );
};

export default FilteredRecipes;