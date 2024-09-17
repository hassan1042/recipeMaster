import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import RecipeCard from "./RecipeCard"; // Component to render individual recipe cards
import { db } from "../../firebase/Firebase";
import Card from "../common/card/Card";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchType = queryParams.get("type");
  let searchQuery = queryParams.get("query");
  const [recipes, setRecipes] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesCollection = collection(db, "recipes");
      let q;
      if(searchQuery){
        searchQuery = searchQuery[0].toLowerCase() + searchQuery.substring(1);
       };
      if (searchType === "name") {
        q = query(recipesCollection, where("name", "==", searchQuery));
      } else if (searchType === "ingredients") {
        const ingredients = searchQuery.split(",").map(ingredient => ingredient.trim().toLowerCase());

        // Create a query to find recipes containing all the specified ingredients
        const querySnapshot = await getDocs(recipesCollection);
        const recipesArray = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(recipe => {
            // Check if recipe contains all the ingredients
            return ingredients.every(ingredient => recipe.ingredients.includes(ingredient));
          });

        setRecipes(recipesArray);
        setDataAvailable(recipesArray.length > 0);
        return;
      }

      const querySnapshot = await getDocs(q);
      const recipesArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(recipesArray);
      setDataAvailable(recipesArray.length > 0);
    };

    fetchRecipes();
  }, [searchType, searchQuery]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Results</h2>
      {dataAvailable ? (
        <div className="flex justify-center items-center space-x-6">
            <Card recipes={recipes} />
          {/* {recipes.map(recipe => (
          ))} */}
        </div>
      ) : (
        <p>No recipes found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default SearchResults;
