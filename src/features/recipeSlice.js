// features/recipeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, push, set, get } from "firebase/database";
import { app } from "../firebase/Firebase";

// Initializing the Database(FireBase)
const db = getDatabase(app);

const initialState = {
  recipes: [],
};
const newRecipeRef = push(ref(db, "recipes"));

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const recipeId = newRecipeRef.key;

      // Add recipe data to Redux state
      state.recipes.push({ id: recipeId, ...action.payload });

      // Add recipe data to Firebase database
      set(newRecipeRef, { id: recipeId, ...action.payload });
    },
    removeRecipe: (state, action) => {
      console.log(action.payload);
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },

    updateRecipe: (state, action) => {
      const { id, rating } = action.payload;
      console.log(id);
      console.log(rating);
      // Update recipe data in Firebase database
      updateRecipeInFirebase(id, { rating });
    },
  },
});

export const { addRecipe, removeRecipe, updateRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;

export const updateRecipeInFirebase = (id, updatedRecipeData) => {
  // const db = getDatabase(app);
  const recipeRef = ref(db, `recipes/${id}`);

  get(recipeRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const currentRecipeData = snapshot.val();
        // console.log(currentRecipeData);
        const updatedData = {
          ...currentRecipeData,
          ...updatedRecipeData,
          testValue: "updated",
        }; // Adding a test value
        // console.log(updatedData);

        set(recipeRef, updatedData)
          .then(() => {
            console.log("Recipe updated successfully in Firebase");
          })
          .catch((error) => {
            console.error("Error updating recipe in Firebase:", error);
          });
      } else {
        console.log("Recipe does not exist in Firebase");
      }
    })
    .catch((error) => {
      console.error("Error fetching recipe from Firebase:", error);
    });
};
