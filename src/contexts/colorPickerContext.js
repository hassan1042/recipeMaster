import React, { createContext, useContext,  useState } from 'react';

const MyContext = createContext();

// Create a context provider component
const ColorPickerProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState('#1F2937');


  const setPrimaryColor = (curColor) => {
    setSelectedColor(curColor);
  };
  

  return (
    <MyContext.Provider value={{selectedColor, setPrimaryColor}}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to access the context values
const useColorContext = () => useContext(MyContext);

export { ColorPickerProvider, useColorContext };
