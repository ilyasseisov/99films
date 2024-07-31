// react
import { useEffect } from 'react';
// mui
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  Skeleton,
} from '@mui/material';
// mui icons
import { Movie as MovieIcon, ArrowBackRounded } from '@mui/icons-material';
// images
import imgs from '../../assets/imgs';
// components
import { MovieList, PaginationCustom, ErrorNetwork } from '..';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
// framer
import { motion } from 'framer-motion';
// redux
import { useDispatch, useSelector } from 'react-redux';
// redux actions
import { setPage } from '../../features/currentGenreOrCategorySlice';
// rtk query hooks
import {
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
} from '../../services/TMDB';
// router
import { useParams, useNavigate } from 'react-router-dom';
//
// framer animation
import { containerAnimationFromBottom } from '../../utils/framerAnimations';
//
export default function Actors() {
  // hooks

  // mui
  const theme = useTheme();
  // router
  const { id } = useParams();
  // router - to navigate back
  const navigate = useNavigate();
  // redux
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.currentGenreOrCategory);
  // rtk
  const { data: actor, isFetching, error } = useGetActorQuery(id);
  const {
    data: actorMovies,
    isFetching: isFetchingMovies,
    error: moviesError,
  } = useGetMoviesByActorIdQuery({ id, page });

  // Reset page to 1 when the Actors component mounts or when the actor ID changes
  useEffect(() => {
    dispatch(setPage(1));
  }, [id, dispatch]);

  // to navigate to 'root/error'
  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error, navigate]);

  // local variables

  // functions
  const splitText = (text) => {
    return text.split('\n').filter((part) => part.trim() !== '');
  };

  // go back
  const handleGoBack = () => {
    navigate(-1);
  };

  // return

  // while fetching stage (skeleton)
  if (isFetching || isFetchingMovies) {
    return (
      <>
        <Container
          maxWidth='xxl'
          sx={{ padding: { xs: '12px', md: '32px 12px 12px 12px' } }}
        >
          <Grid container sx={{ marginBottom: '48px' }}>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: { xs: '32px', lg: '40px' },
              }}
            >
              {/* actor skeleton */}
              {
                <>
                  <Box sx={{ marginBottom: '16px', position: 'relative' }}>
                    <Skeleton
                      variant='rectangular'
                      width={300}
                      height={450}
                      sx={{ borderRadius: '12px' }}
                    />
                    <Skeleton
                      sx={{ margin: '0 auto' }}
                      variant='text'
                      width={'20%'}
                      height={36}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                    }}
                  >
                    <Skeleton variant='text' width={'100%'} height={40} />
                    <Skeleton variant='text' width={'100%'} height={40} />
                    <Skeleton variant='text' width={'100%'} height={40} />
                    <Skeleton variant='text' width={'100%'} height={40} />
                    <Skeleton variant='text' width={'100%'} height={40} />
                    <Skeleton variant='text' width={'100%'} height={40} />
                  </Box>
                </>
              }
            </Grid>

            {/* movies skeleton */}
            <Grid item xs={12}>
              {
                <>
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
                </>
              }
            </Grid>
          </Grid>
          <Button
            onClick={handleGoBack}
            sx={{
              position: 'absolute',
              top: '100px',
              right: '16px',
              color: theme.palette.text.primary,
              borderColor: theme.palette.text.primary,
              textTransform: 'capitalize',
              '&:hover': {
                borderColor: theme.palette.text.primary,
                bgcolor: 'transparent',
              },
            }}
            variant='outlined'
            endIcon={<ArrowBackRounded />}
          >
            Back
          </Button>
        </Container>
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

  // if error (movies)
  if (moviesError) {
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
        initial='hidden'
        animate='visible'
        variants={containerAnimationFromBottom}
      >
        <Container
          maxWidth='xxl'
          sx={{ padding: { xs: '12px', md: '32px 12px 12px 12px' } }}
        >
          <Grid container sx={{ marginBottom: '48px' }}>
            {/* image and text */}
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: { xs: '32px', lg: '40px' },
              }}
            >
              {/* image */}
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignSelf: 'center',
                  flexDirection: 'column',
                  marginBottom: '24px',
                }}
              >
                <Box sx={{ marginBottom: '16px', position: 'relative' }}>
                  <img
                    alt={actor?.name}
                    src={
                      actor?.profile_path
                        ? `https://image.tmdb.org/t/p/w780/${actor.profile_path}`
                        : imgs.defaultActorImage
                    }
                    style={{
                      borderRadius: '12px',
                    }}
                    className='Actors__cover'
                  />
                </Box>
              </Grid>

              {/* text and imdb */}

              <Grid item xs={12}>
                {/* text */}
                <Grid item xs={12} sx={{ marginBottom: '32px' }}>
                  {/* name */}
                  <Typography
                    variant='h4'
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginBottom: '6px',
                      color: actor?.name
                        ? 'inherit'
                        : theme.palette.text.disabled,
                    }}
                  >
                    {actor?.name || 'No name'}
                  </Typography>

                  {/* bio */}
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 'normal',
                      color: actor?.biography
                        ? 'inherit'
                        : theme.palette.text.disabled,
                    }}
                  >
                    {actor?.biography
                      ? splitText(actor.biography).map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))
                      : 'No biography'}
                  </Typography>
                </Grid>

                {/* Details */}
                <Grid
                  item
                  xs={12}
                  sx={{ marginBottom: '32px', alignSelf: 'flex-start' }}
                >
                  <Typography variant='h5' sx={{ marginBottom: '12px' }}>
                    Details
                  </Typography>

                  {/* imdb */}
                  {actor?.imdb_id && (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Button
                        href={
                          `https://www.imdb.com/name/${actor?.imdb_id}` || '#'
                        }
                        target='_blank'
                        rel='noopener noreferrer'
                        variant='outlined'
                        endIcon={<MovieIcon />}
                        sx={{
                          color: theme.palette.text.primary,
                          borderColor: theme.palette.text.primary,
                          '&:hover': {
                            borderColor: theme.palette.text.primary,
                          },
                        }}
                      >
                        IMDB
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* You may also like */}
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ marginBottom: '12px' }}>
                Movies
              </Typography>
              {actorMovies.results.length > 0 ? (
                <MovieList movies={actorMovies?.results.slice(0, 12)} />
              ) : (
                <Typography
                  variant='body1'
                  sx={{ color: theme.palette.text.disabled }}
                >
                  No movies
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* back button */}
          <Button
            onClick={handleGoBack}
            sx={{
              position: 'absolute',
              top: '100px',
              right: '16px',
              color: theme.palette.text.primary,
              borderColor: theme.palette.text.primary,
              textTransform: 'capitalize',
              '&:hover': {
                borderColor: theme.palette.text.primary,
                bgcolor: 'transparent',
              },
            }}
            variant='outlined'
            endIcon={<ArrowBackRounded />}
          >
            Back
          </Button>

          {/* pagination */}
          {actorMovies?.total_pages > 1 && (
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
                totalPages={actorMovies?.total_pages}
              />
            </Box>
          )}
        </Container>
      </motion.div>
    </>
  );
}
