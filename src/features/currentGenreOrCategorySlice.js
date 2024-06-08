// redux toolkit
import { createSlice } from '@reduxjs/toolkit';

// slice
export const genreOrCategorySlice = createSlice({
  // name
  name: 'genreOrCategory',
  // initial state
  initialState: {
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  // reducers
  reducers: {
    // action: select genre or category
    selectGenreOrCategory: (state, action) => {
      console.log(action.payload);
    },
  },
});

//// export

// actions
export const { selectGenreOrCategory } = genreOrCategorySlice.actions;
// reducer
export const genreOrCategoryReducer = genreOrCategorySlice.reducer;
