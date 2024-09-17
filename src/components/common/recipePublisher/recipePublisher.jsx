import React from 'react'

const RecipePublisher = ({ userName, userImg, userDescription }) => {
    return (
        <>
        <div
       className="items-center p-2 w-1/2 mx-auto bg-white dark:bg-textDark shadow-md rounded-lg md:flex-row md:p-6 md:space-x-6"

        >
        {/* <div className='text-yellow-500 text-3xl font-bold'>The Chef</div> */}
   <div className='flex flex-col justify-center items-between'>
   <p
   className='text-yellow-500 text-xl font-bold'
   >Recipe contributed by:</p>
   <div
       className="flex flex-col items-center p-4  justify-center   md:flex-row md:p-6 md:space-x-6">
        <img 
          className="w-24 h-24 rounded-full shadow-lg md:w-24 md:h-24" 
          src={userImg} 
          alt={userName} 
        />
        <div className="mt-4 text-center md:mt-0 md:text-left">
          <h2 className="text-xl font-semibold  dark:text-text">{userName ? userName : 'Anonymous'}</h2>
        </div>
      </div>
   </div>
      </div>
      </>
    );
};

export default RecipePublisher
