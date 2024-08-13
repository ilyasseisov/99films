// react
import { useEffect } from 'react';
// mui
import {
  Container,
  Box,
  Typography,
  Grid,
  Skeleton,
  useMediaQuery,
} from '@mui/material';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
// framer
import { motion } from 'framer-motion';
// components
import { MovieList, Slider, PaginationCustom, ErrorNetwork } from '..';
// redux
import { useSelector, useDispatch } from 'react-redux';
// rtk query hooks
import { useGetMoviesQuery } from '../../services/TMDB';
// router
import { useNavigate } from 'react-router-dom';

// redux actions
import { setPage } from '../../features/currentGenreOrCategorySlice';
// framer animation
import { containerAnimationFromBottom } from '../../utils/framerAnimations';
//
export default function Movies() {
  // hooks
  // mui theme
  const theme = useTheme();

  // media queries
  const isLgBreakpoint = useMediaQuery(
    '(min-width: 1200px) and (max-width: 1535.99px)'
  );
  const isXxlBreakpoint = useMediaQuery('(min-width: 1800px)');

  // redux
  const dispatch = useDispatch();
  const { genreIdOrCategoryName, searchQuery, page } = useSelector(
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

  // router
  const navigate = useNavigate();

  // to navigate to 'root/error'
  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error, navigate]);

  // local variables
  // to make sure that rows are symmetrical
  const numberOfMovies = isLgBreakpoint || isXxlBreakpoint ? 12 : 16;
  const numberOfSlides = 20 - numberOfMovies;

  // functions
  // return

  // while fetching stage
  if (isFetching) {
    return (
      <>
        <Container maxWidth='xl' sx={{ marginTop: '32px' }}>
          <Box sx={{ marginBottom: '24px' }}>
            <Skeleton
              sx={{ borderRadius: '12px' }}
              variant='rectangular'
              width='100%'
              height={400}
            />
          </Box>
          <Box sx={{ marginBottom: '48px' }}>
            <Grid container spacing={2}>
              {[...Array(12)].map((_, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  xl={3}
                  xxl={2}
                  key={index}
                  sx={{ marginBottom: '12px' }}
                >
                  <Skeleton
                    sx={{ borderRadius: '12px', marginBottom: '12px' }}
                    variant='rectangular'
                    width='100%'
                    height={300}
                  />
                  <Skeleton
                    sx={{ margin: '0 auto' }}
                    variant='text'
                    width={'24%'}
                    height={36}
                  />
                  <Skeleton
                    sx={{ margin: '0 auto' }}
                    variant='text'
                    width={'80%'}
                    height={32}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </>
    );
  }

  // if no movies were returned
  if (!movies.results.length) {
    return (
      <>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: theme.palette.text.disabled }} variant='p'>
            No movies
          </Typography>
        </Box>
      </>
    );
  }

  // if error
  if (error) {
    return (
      <>
        <ErrorNetwork />
      </>
    );
  }

  // primary return
  return (
    <>
      <motion.div
        key={genreIdOrCategoryName}
        initial='hidden'
        animate='visible'
        variants={containerAnimationFromBottom}
      >
        <Box sx={{ marginBottom: '24px' }}>
          <Slider movies={movies.results.slice(0, numberOfSlides)} />
        </Box>
      </motion.div>
      <Box sx={{ marginBottom: '48px' }}>
        <MovieList movies={movies.results.slice(numberOfSlides, 20)} />
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
            setPage={(page) => dispatch(setPage(page))}
            totalPages={movies?.total_pages}
          />
        </Box>
      )}
    </>
  );
}
