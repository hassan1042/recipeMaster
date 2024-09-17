// reviewSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
};

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
  },
});

export const { addReview } = reviewSlice.actions;

export default reviewSlice.reducer;
