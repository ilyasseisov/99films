// hooks
import { useState } from 'react';
// mui
import { Box } from '@mui/material';
// components
import { MovieList, Slider } from '..';
// redux
import { useSelector } from 'react-redux';
// rtk query hooks
import { useGetMoviesQuery } from '../../services/TMDB';
useGetMoviesQuery;
export default function Movies() {
  // hooks
  const { data } = useGetMoviesQuery();
  console.log(data);
  // local variables
  // functions
  // return
  return (
    <>
      <Box sx={{ marginBottom: '24px' }}>
        <Slider />
      </Box>
      <Box sx={{ paddingLeft: '20px' }}>
        <MovieList centerAlign />
      </Box>
    </>
  );
}
