// redux toolkit
import { createSlice } from '@reduxjs/toolkit';

// slice
export const genreOrCategorySlice = createSlice({
  // name
  name: 'genreOrCategory',
  // initial state
  initialState: {
    genreIdOrCategoryName: 'popular',
    page: 1,
    searchQuery: '',
  },
  // reducers
  reducers: {
    // action: select genre or category
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
      state.page = 1;
    },

    // search movie
    searchMovie: (state, action) => {
      state.genreIdOrCategoryName = '';
      state.searchQuery = action.payload;
    },

    // set page
    setPage: (state, action) => {
      state.page = action.payload;
    },

    //  clear genre or category
    clearGenreOrCategory: (state) => {
      state.genreIdOrCategoryName = '';
    },
  },
});

//// export

// actions
export const {
  selectGenreOrCategory,
  searchMovie,
  setPage,
  clearGenreOrCategory,
} = genreOrCategorySlice.actions;
// reducer
export const genreOrCategoryReducer = genreOrCategorySlice.reducer;
