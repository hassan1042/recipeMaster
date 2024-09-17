import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const RecipeInfo = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "chineese", "Italian", "Indian", "pakistani"]; // Replace with actual categories

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const fetchedRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(fetchedRecipes);
      setFilteredRecipes(fetchedRecipes);
    };
    fetchRecipes();
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) => recipe.category === category);
      setFilteredRecipes(filtered);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 dark:text-text">Recipe Information</h2>
      <div className="flex space-x-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 rounded-lg ${activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="font-bold text-center">{recipe.name}</h3>
           <div className="flex justify-between items-center">
           <p > {recipe.category}</p>
           <p>Health Meter:  {recipe.healthPercentage}%</p>
           </div>
           <p className="text-sm">{recipe.introduction}</p>
            {/* <p>Rating: {recipe.rating}/5</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeInfo;
