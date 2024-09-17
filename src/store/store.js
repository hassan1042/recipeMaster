import { configureStore } from '@reduxjs/toolkit';
// import recipeReducer from './features/recipeSlice';
import recipeReducer from '../features/recipeSlice'
import ratingSlice from '../features/ratingSlice';

export const  store = configureStore({
  reducer: {
          recipes: recipeReducer,
          // rating: ratingSlice,
  },
})