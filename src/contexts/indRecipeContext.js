import React, { createContext, useContext, useEffect, useState } from 'react';

const MyContext = createContext();

// Create a context provider component
const IndRecipecontextProvider = ({ children }) => {
  const [indRecipe, setIndRecipe] = useState(null);
  useEffect(() => {
    const storedRecipe = localStorage.getItem('individualRecipe');
    if (storedRecipe) {
      setIndRecipe(JSON.parse(storedRecipe));
    }
  }, []);

  const setIndividualRecipe = (curElm) => {
    setIndRecipe(curElm);
    localStorage.setItem('individualRecipe', JSON.stringify(curElm));
  };
  

  return (
    <MyContext.Provider value={{ indRecipe, setIndividualRecipe}}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to access the context values
const useIndRecipeContext = () => useContext(MyContext);

export { IndRecipecontextProvider, useIndRecipeContext };
