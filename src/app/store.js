// redux
import { configureStore } from '@reduxjs/toolkit';
// api from rtk query
import { tmdbApi } from '../services/TMDB';
// reducer from slice
import { genreOrCategoryReducer } from '../features/currentGenreOrCategorySlice';
import { userReducer } from '../features/authSlice';

export default configureStore({
  // reducers
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
  },

  // middleware
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
});
