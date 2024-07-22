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
      state.searchQuery = action.payload;
    },

    // set page
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

//// export

// actions
export const { selectGenreOrCategory, searchMovie, setPage } =
  genreOrCategorySlice.actions;
// reducer
export const genreOrCategoryReducer = genreOrCategorySlice.reducer;
