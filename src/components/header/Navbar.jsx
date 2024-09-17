import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecipeFilterContext } from "../../contexts/recipeFilterContext";
import { useAuthContext } from "../../contexts/authContext";
import { ColorPickerProvider, useColorContext } from "../../contexts/colorPickerContext";
import DarkMode from "./DarkMode";
import Search from "./Search";
import { useAuth } from "../../hookx/use-Auth";
const Navbar = () => {
  const { currentUser } = useAuth();

  const { cat, recipes } = useRecipeFilterContext();
  const { setPrimaryColor, selectedColor } = useColorContext();

  const uniqueCategories = [
    "All",
    ...new Set(recipes.map((curElm) => curElm.category)),
  ];

  const { userSignOut } = useAuthContext();

  const handleCat = (category) => {
    cat(category);
  };

  const handleUserSignOut = () => {
    userSignOut();
  };

  const handleColorChange = (color) => {
    setPrimaryColor(color);
  };



  return (
    <>
      <div className="flex justify-center items-center sticky top-0 z-10 w-full text-white text-[1.1em] flex-wrap pb-5 bg-gray-800 dark:bg-bgPrimaryDark">
        {/*Categories */}

      <div className="flex justify-between items-center">
      <NavLink to="/" className="cursor-pointer w-20 me-5">
          <img src="./Images/recipeMaster.png" alt="" />
        </NavLink>
        <NavLink to="/" className={({ isActive }) => `${isActive ? "text-[#46fff6]" : ""} cursor-pointer py-2 px-4`}>
          Home
        </NavLink>
        <div>
          {uniqueCategories.map((curElm, ind) => (
            <button key={ind}>
              <NavLink
                to={`/FilteredRecipes/${curElm}`}
                className={({ isActive }) => `${isActive ? "text-[#46fff6]" : ""} py-2 px-4 capitalize`}
                onClick={() => handleCat(curElm)}
              >
                {curElm}
              </NavLink>
            </button>
          ))}
        </div>
        <NavLink to="/Recipes" className={({ isActive }) => `${isActive ? "text-[#46fff6]" : ""}`}>
          <button className="py-2 px-4">New Recipe</button>
        </NavLink>
        {/* <NavLink to="/Favourites" className={({ isActive }) => `${isActive ? "text-[#46fff6]" : ""} cursor-pointer py-2 px-4`}>
          Favourites
        </NavLink> */}
        <NavLink to="/Dashboard" className={({ isActive }) => `${isActive ? "text-[#46fff6]" : ""} cursor-pointer py-2 px-4`}>
          Dashboard
        </NavLink>
      {
        currentUser && (
          <button className="py-2 px-4" onClick={handleUserSignOut}>
          Sign out
        </button>
        )
      }
        <DarkMode/>
        <ColorPickerProvider onColorChange={handleColorChange} />
      </div>
        
        {/* Search Input and Select */}
     <Search/>
      </div>
      <hr />
    
    </>
  );
};

export default Navbar;
