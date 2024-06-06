// redux
import { configureStore } from '@reduxjs/toolkit';
// api from rtk query
import { tmdbApi } from '../services/TMDB';

export default configureStore({
  // reducers
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },

  // middleware
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
});
