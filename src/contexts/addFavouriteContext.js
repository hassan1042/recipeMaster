import React, { createContext, useContext } from 'react';
import { AddToFavourites } from '../services/addToFavouritesService';

// Create a new context
const MyContext = createContext();

const AddToFavouritesRecipeContextProvider = ({ children }) => {

  const addToFavourites = (id, uid, name ) => {
    AddToFavourites(id, uid, name)
  };
  return (
    <MyContext.Provider value={{ addToFavourites}}>
      {children}
    </MyContext.Provider>
  );
};
const useAddToFavouritesContext = () => useContext(MyContext);
export { AddToFavouritesRecipeContextProvider, useAddToFavouritesContext };
