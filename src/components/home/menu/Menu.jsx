import React from "react";
import Card from "../../common/card/Card";

const Menu = ({recipes}) => {

  return (
    <>
     
      <div 
 
      className={`bg-neutral-100 dark:bg-cardDark h-auto flex flex-wrap justify-center shadow-lg py-5 space-x-4 space-y-4 `}>
      <Card recipes={recipes}/>
    
      </div>
    </>
  );
};

export default Menu;
