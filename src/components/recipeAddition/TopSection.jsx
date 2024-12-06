import React from "react";

function TopSection({name, setName, introduction, setIntroduction, ingredients, setIngredients, normalizeIngredient, making , setMaking, }) {
  return (
    <div>
      <label htmlFor="name" className="flex items-center justify-center ">
        <i className="md:text-xl  font-bold">Name:</i>
        <input
          className="w-auto dark:text-black capitalize p-2 m-4  text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500  max-sm:w-[200px]"
          value={name}
          onChange={(e) => setName(e.target.value.toLocaleLowerCase())}
          type="text"
          placeholder="Name of the recipe"
          required
        />
      </label>
      <div className="flex items-center justify-center flex-wrap ">
        <label className="flex items-center" htmlFor="introduction">
          <i className="md:text-xl  font-bold">Introduction:</i>
          <textarea
            className="w-auto dark:text-black capitalize  p-2 m-4 text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 max-sm:w-[200px]"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            type="text"
            placeholder="Introduce your recipe"
            rows="2"
            cols="30"
            required
          />
        </label>
        <label className="flex items-center " htmlFor="ingredients">
          <i className="md:text-xl  font-bold"> Ingredients:</i>
          <textarea
            className="w-auto dark:text-black capitalize p-2 m-4  text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500  max-sm:w-[200px]"
            value={ingredients}
            onChange={(e) =>
              setIngredients(e.target.value.split(",").map(normalizeIngredient))
            }
            type="text"
            placeholder="Ingredients of your Recipe (separated by commas)"
            rows="2"
            cols="30"
            required
          />
        </label>

        <label className="flex items-center" htmlFor="making">
          <i className="md:text-xl  font-bold">Assembling:</i>
          <textarea
            className="w-auto dark:text-black capitalize  p-2 m-4 text-md shadow-lg py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500  max-sm:w-[200px]"
            value={making}
            onChange={(e) => setMaking(e.target.value)}
            type="text"
            placeholder="Explain your recipe"
            rows="2"
            cols="30"
            required
          />
        </label>
      </div>
    </div>
  );
}

export default TopSection;
