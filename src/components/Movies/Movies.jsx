// hooks
import { useState } from 'react';
// mui
import { Box, Typography } from '@mui/material';
// components
import { MovieList, Slider } from '..';
// redux
import { useSelector } from 'react-redux';
// rtk query hooks
import { useGetMoviesQuery } from '../../services/TMDB';
useGetMoviesQuery;
export default function Movies() {
  // hooks
  const { data, isFetching, error } = useGetMoviesQuery();
  // local variables
  // functions
  // return

  // while fetching stage
  if (isFetching) {
    return <Typography>Fetching...</Typography>;
  }

  // if no movies were returned
  if (!data.results.length) {
    return <Typography>No movies</Typography>;
  }

  // if error
  if (error) {
    return <Typography>Error</Typography>;
  }

  // primary return
  return (
    <>
      <Box sx={{ marginBottom: '24px' }}>
        <Slider />
      </Box>
      <Box>
        <MovieList movies={data.results} centerAlign />
      </Box>
    </>
  );
}
