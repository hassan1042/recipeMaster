import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecipeFilterContext } from "../../contexts/recipeFilterContext";
import { useAuthContext } from "../../contexts/authContext";
import {
  ColorPickerProvider,
  useColorContext,
} from "../../contexts/colorPickerContext";
import DarkMode from "./DarkMode";
import Search from "./Search";
import { useAuth } from "../../hookx/use-Auth";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  return (
    <div className=" bg-main text-textDark dark:text-text shadow-xl dark:bg-bgPrimaryDark  fixed top-0 z-10 w-full ">
      <div className="flex justify-between items-center w-full px-4">
        <NavLink
          to="/"
          className="cursor-pointer w-20 me-5 min-[1200px]:hidden"
        >
          <img src="./Images/recipeMaster.png" alt="" />
        </NavLink>
        <i
          onClick={toggleMenu}
          className="cursor-pointer text-3xl min-[1200px]:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </i>
      </div>
      <div className="flex justify-center  items-center  w-full  font-semibold italic  text-[1.1em] flex-wrap ">
        {/*Categories */}
        <div
          className={`flex ${
            isMenuOpen ? "max-[1200px]:flex" : "max-[1200px]:hidden"
          } justify-between items-center max-[1200px]:flex-col space-y-3 max-[1200px]:pb-3 `}
        >
          <NavLink
            to="/"
            className="cursor-pointer w-20 me-5 max-[1200px]:hidden "
          >
            <img src="./Images/recipeMaster.png" alt="" />
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-[#46fff6]" : ""} cursor-pointer py-2 px-4`
            }
          >
            Home
          </NavLink>
          <div className="flex justify-center items-center  flex-wrap">
            {uniqueCategories.map((curElm, ind) => (
              <button key={ind}>
                <NavLink
                  to={`/FilteredRecipes/${curElm}`}
                  className={({ isActive }) =>
                    `${isActive ? "text-[#46fff6]" : ""} py-2 px-4 capitalize `
                  }
                  onClick={() => handleCat(curElm)}
                >
                  {curElm}
                </NavLink>
              </button>
            ))}
          </div>
          <NavLink
            to="/Recipes"
            className={({ isActive }) => `${isActive ? "text-[#46fff6]" : ""}`}
          >
            <button className="py-2 px-4">New Recipe</button>
          </NavLink>
        
          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              `${isActive ? "text-[#46fff6]" : ""} cursor-pointer py-2 px-4`
            }
          >
            Dashboard
          </NavLink>
          {currentUser && (
            <button className="py-2 px-4" onClick={handleUserSignOut}>
              Sign out
            </button>
          )}
          <DarkMode />
          {/* <ColorPickerProvider onColorChange={handleColorChange} /> */}
        </div>

        {/* Search Input and Select */}
      </div>

      <hr />
      <div className="mx-auto py-3 flex justify-center items-center">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
