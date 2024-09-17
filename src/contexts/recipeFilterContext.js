import React, { createContext, useContext, useEffect, useState } from 'react';
import { listenForRecipes } from '../services/recipeService';
// import { listenForRecipes } from '../firebase/Firebase';


const MyContext = createContext();

const RecipeFilterProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredByCategory, setFilteredByCategory] = useState(null);
  const [isAllCategorySelected, setIsAllCategorySelected] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");
  const [dataAvail, setDataAvail] = useState(false);

 useEffect(() => {
    const unsubscribe = listenForRecipes(
      setRecipes,
      setFilteredRecipes,
      setDataAvail
    );
   
    return () => {
      // unsubscribe();
    };
  }, []);
  // console.log(dataAvail);
  useEffect(() => {
    const storedCategory = localStorage.getItem('selectedCat');
    if (storedCategory) {
      const category = JSON.parse(storedCategory);
      setSelectedCat(category);
      
      if (category === "All") {
        setFilteredRecipes(recipes);
        setFilteredByCategory(recipes);
        setIsAllCategorySelected(true);
      } else {
        const selected = recipes.filter((curElm) => curElm.category === category);
        setFilteredByCategory(selected);
        setFilteredRecipes(selected);
      }
    }
  }, [recipes]);
  // Function to set the id
  const cat = (category) => {
    if (category === "All") {
      setFilteredRecipes(recipes);
      setFilteredByCategory(recipes);
      setIsAllCategorySelected(true);
      setSelectedCat("All of our Recipes");
      localStorage.setItem('selectedCat', JSON.stringify("All"));
    } else {
      const selected = recipes.filter((curElm) => curElm.category === category);
      setFilteredByCategory(selected);
      setFilteredRecipes(selected);
      setSelectedCat(selected[0].category);
      localStorage.setItem('selectedCat', JSON.stringify(category));
    }
  };

  const subCat = (category) => {
    if (isAllCategorySelected) {
      const subAll = filteredByCategory.filter(
        (curElm) => curElm.subCategory === category
      );
      setFilteredRecipes(subAll);
      // console.log(filteredRecipes)
    } else {
      const selectedSub = filteredByCategory.filter(
        (curElm) => curElm.subCategory === category
      );
      setFilteredRecipes(selectedSub);
    }
  };

  // Pass state variable and function as values to the provider's value prop
  return (
    <MyContext.Provider value={{ cat, subCat , filteredRecipes, selectedCat ,  setFilteredRecipes , recipes, dataAvail, }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to access the context values
const useRecipeFilterContext = () => useContext(MyContext);

export { RecipeFilterProvider, useRecipeFilterContext };
