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
// redux actions
import { selectGenreOrCategory } from '../../features/currentGenreOrCategorySlice';
export default function Movies() {
  // hooks
  const [page, setPage] = useState(1);
  // redux
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  // rtk query
  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    // searchQuery,
  });

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
