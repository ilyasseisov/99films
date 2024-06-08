// redux
import { configureStore } from '@reduxjs/toolkit';
// api from rtk query
import { tmdbApi } from '../services/TMDB';
// reducer from slice
import { genreOrCategoryReducer } from '../features/currentGenreOrCategorySlice';

export default configureStore({
  // reducers
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
  },

  // middleware
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
});
