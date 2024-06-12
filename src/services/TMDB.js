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
      query: ({ genreIdOrCategoryName, page }) => {
        // get movies by category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // get movies by genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // get popular movies
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    //
    // get single movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    //
    // get recommend movies (you may also like)
    getRecommendations: builder.query({
      query: ({ movieId, list }) =>
        `/movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),
    //
    //
  }),
});

// export
export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} = tmdbApi;
