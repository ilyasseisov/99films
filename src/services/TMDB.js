// rtk query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// api key
const tmdbApiKey = 'c3e422a2ea4fbce1b97cbebce6616f71';
// base URL
const baseURL = 'https://api.themoviedb.org/3';
// dummy var
const page = 1;

export const tmdbApi = createApi({
  // reducerPath and baseQuery
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),

  // endpoints
  endpoints: (builder) => ({
    // get movies
    getMovies: builder.query({
      query: () => {
        // get popular movies
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    //
    //
    //
    //
  }),
});

// export
export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
