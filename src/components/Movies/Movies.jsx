// hooks
import { useState } from 'react';
// mui
import { Box, Typography, useMediaQuery } from '@mui/material';
// components
import { MovieList, Slider, PaginationCustom } from '..';
// redux
import { useSelector } from 'react-redux';
// rtk query hooks
import { useGetMoviesQuery } from '../../services/TMDB';
// redux actions
import { selectGenreOrCategory } from '../../features/currentGenreOrCategorySlice';
export default function Movies() {
  // hooks
  const [page, setPage] = useState(1);
  const isLgBreakpoint = useMediaQuery(
    '(min-width: 1200px) and (max-width: 1535.99px)'
  );
  const isXxlBreakpoint = useMediaQuery('(min-width: 1800px)');

  // redux
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  // rtk query
  const {
    data: movies,
    isFetching,
    error,
  } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  // local variables
  // to make sure that rows are symmetrical
  const numberOfMovies = isLgBreakpoint || isXxlBreakpoint ? 12 : 16;
  const numberOfSlides = 20 - numberOfMovies;

  // functions
  // return

  // while fetching stage
  if (isFetching) {
    return <Typography>Fetching...</Typography>;
  }

  // if no movies were returned
  if (!movies.results.length) {
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
        <Slider movies={movies.results.slice(0, numberOfSlides)} />
      </Box>
      <Box sx={{ marginBottom: '48px' }}>
        <MovieList
          movies={movies.results.slice(numberOfSlides, 20)}
          centerAlign
        />
      </Box>

      {/* pagination */}
      {movies.total_pages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '48px',
          }}
        >
          <PaginationCustom
            currentPage={page}
            setPage={setPage}
            totalPages={movies?.total_pages}
          />
        </Box>
      )}
    </>
  );
}
