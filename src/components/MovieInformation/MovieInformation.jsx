// mui
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  Skeleton,
} from '@mui/material';
// mui icons
import {
  Language,
  Movie as MovieIcon,
  Theaters,
  FavoriteBorderRounded,
  FavoriteRounded,
  StarBorderRounded,
  StarRounded,
  ArrowBackRounded,
} from '@mui/icons-material';
// framer
import { motion } from 'framer-motion';
// components
import { ErrorNetwork } from '..';
// images
import imgs from '../../assets/imgs';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
// components
import { MovieList } from '..';
// react hooks
import { useState, useEffect } from 'react';
// router
import { Link, useParams, useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
// rtk query
import { skipToken } from '@reduxjs/toolkit/query';
// rtk query hooks
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from '../../services/TMDB';
// redux actions
import {
  selectGenreOrCategory,
  clearGenreOrCategory,
} from '../../features/currentGenreOrCategorySlice';
// axios
import axios from 'axios';
// framer animation
import { containerAnimationFromBottom } from '../../utils/framerAnimations';

export default function MovieInformation() {
  // redux
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // mui theme
  const theme = useTheme();
  // state for trailer modal
  const [openTrailerModal, setOpenTrailerModal] = useState(false);
  // state for movie status (fav/watchlist)
  const [movieStatus, setMovieStatus] = useState({});
  // router - to get param from URL
  const { id } = useParams();
  // router - to navigate back
  const navigate = useNavigate();
  //// rtk query
  // single movie
  const { data: movie, isFetching, error } = useGetMovieQuery(id);
  // recommendations
  const {
    data: recommendations,
    isFetching: isRecommendationsFetching,
    error: recommendationsError,
  } = useGetRecommendationsQuery({
    list: 'recommendations',
    movieId: id,
  });
  // user favorite movies
  const { data: favoriteMovies } = useGetListQuery(
    user && localStorage.getItem('session_id')
      ? {
          listName: 'favorite/movies',
          accountId: user.id,
          sessionId: localStorage.getItem('session_id'),
          page: 1,
        }
      : skipToken
  );
  // user watchlist movies
  const { data: watchlistMovies } = useGetListQuery(
    user && localStorage.getItem('session_id')
      ? {
          listName: 'watchlist/movies',
          accountId: user.id,
          sessionId: localStorage.getItem('session_id'),
          page: 1,
        }
      : skipToken
  );

  // to know whether movie is in favorite or in watchlist
  useEffect(() => {
    if (movie) {
      setMovieStatus((prevStatus) => ({
        ...prevStatus,
        [movie.id]: {
          isFavorited: !!favoriteMovies?.results?.find(
            (favMovie) => favMovie.id === movie?.id
          ),
          isWatchlisted: !!watchlistMovies?.results?.find(
            (watchlistMovie) => watchlistMovie.id === movie?.id
          ),
        },
      }));
    }
  }, [favoriteMovies, watchlistMovies, movie]);

  // to navigate to 'root/error'
  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error, navigate]);

  // scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movie]);

  // redux
  const dispatch = useDispatch();
  // local variables
  const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

  //// functions
  // add to favorite
  async function addToFavorites() {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/favorite?&api_key=${tmdbApiKey}&session_id=${localStorage.getItem(
        'session_id'
      )}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !movieStatus[movie.id]?.isFavorited,
      }
    );
    setMovieStatus((prevStatus) => ({
      ...prevStatus,
      [movie.id]: {
        ...prevStatus[movie.id],
        isFavorited: !prevStatus[movie.id]?.isFavorited,
      },
    }));
  }

  // add to watchlist
  async function addToWatchlist() {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/watchlist?&api_key=${tmdbApiKey}&session_id=${localStorage.getItem(
        'session_id'
      )}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !movieStatus[movie.id]?.isWatchlisted,
      }
    );
    setMovieStatus((prevStatus) => ({
      ...prevStatus,
      [movie.id]: {
        ...prevStatus[movie.id],
        isWatchlisted: !prevStatus[movie.id]?.isWatchlisted,
      },
    }));
  }

  // go back
  const handleGoBack = () => {
    navigate(-1);
  };

  // while fetching stage
  if (isFetching || isRecommendationsFetching) {
    return (
      <>
        <Container
          maxWidth='xxl'
          sx={{ padding: { xs: '12px', md: '32px 12px 12px 12px' } }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: 'center',
                marginBottom: { xs: '32px', lg: '40px' },
              }}
            >
              <Grid
                item
                xs={12}
                lg={5}
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'center', lg: 'flex-start' },
                  flexDirection: 'column',
                  marginBottom: '24px',
                }}
              >
                <Box sx={{ marginBottom: '16px', position: 'relative' }}>
                  <Skeleton
                    variant='rectangular'
                    width={300}
                    height={450}
                    sx={{ borderRadius: '12px' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Skeleton variant='circular' width={32} height={32} />
                  <Skeleton variant='text' width={40} />
                </Box>
              </Grid>
              <Grid item lg={7}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: {
                      xs: '200px',
                      sm: '300px',
                      md: '440px',
                      xl: '560px',
                      xxl: '640px',
                    },
                  }}
                >
                  <Skeleton variant='text' width='80%' height={60} />
                  <Skeleton variant='text' width='60%' height={40} />
                  <Skeleton variant='text' width='92%' height={100} />
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ marginBottom: '40px', alignSelf: 'flex-start' }}
            >
              <Box sx={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <Skeleton variant='text' width='10%' />
                <Skeleton variant='text' width='10%' />
                <Skeleton variant='text' width='10%' />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '24px',
                }}
              >
                <Skeleton
                  variant='rectangular'
                  width={80}
                  height={30}
                  sx={{ borderRadius: '20px' }}
                />
                <Skeleton
                  variant='rectangular'
                  width={80}
                  height={30}
                  sx={{ borderRadius: '20px' }}
                />
                <Skeleton
                  variant='rectangular'
                  width={80}
                  height={30}
                  sx={{ borderRadius: '20px' }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Skeleton variant='rectangular' width={80} height={30} />
                <Skeleton variant='rectangular' width={80} height={30} />
                <Skeleton variant='rectangular' width={80} height={30} />
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '32px' }}>
              <Grid container>
                {Array.from(new Array(12)).map((_, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    xl={3}
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <Skeleton variant='circular' width={80} height={80} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Skeleton variant='text' width='60%' />
                      <Skeleton variant='text' width='40%' />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {Array.from(new Array(12)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
            </Grid>
          </Grid>
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

  // if error (recommendations)
  if (recommendationsError) {
    return (
      <>
        <ErrorNetwork />
      </>
    );
  }

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
          <Grid container>
            {/* cover and text */}
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: 'center',
                marginBottom: { xs: '32px', lg: '40px' },
              }}
            >
              {/* cover and rating */}
              <Grid
                item
                xs={12}
                lg={5}
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'center', lg: 'flex-start' },
                  flexDirection: 'column',
                  marginBottom: '24px',
                }}
              >
                {/* cover */}
                <Box sx={{ marginBottom: '16px', position: 'relative' }}>
                  <img
                    alt={movie?.title}
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : imgs.defaultMovieImage
                    }
                    style={{
                      borderRadius: '12px',
                    }}
                    className='MovieInformation__cover'
                  />
                  {/* add to favorites */}
                  {isAuthenticated && (
                    <IconButton
                      disableRipple
                      onClick={addToFavorites}
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        transition: 'all 0.3s ease-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      {movieStatus[movie.id]?.isFavorited ? (
                        <FavoriteRounded
                          sx={{
                            fontSize: 32,
                            color: theme.palette.primary.main,
                          }}
                        />
                      ) : (
                        <FavoriteBorderRounded
                          sx={{
                            fontSize: 32,
                            color: theme.palette.primary.main,
                          }}
                        />
                      )}
                    </IconButton>
                  )}

                  {/* add to watchlist */}
                  {isAuthenticated && (
                    <IconButton
                      disableRipple
                      onClick={addToWatchlist}
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        transition: 'all 0.3s ease-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      {movieStatus[movie.id]?.isWatchlisted ? (
                        <StarRounded sx={{ fontSize: 32, color: '#F1B80D' }} />
                      ) : (
                        <StarBorderRounded
                          sx={{ fontSize: 32, color: '#F1B80D' }}
                        />
                      )}
                    </IconButton>
                  )}
                </Box>

                {/* rating */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <img
                    style={{ width: '32px' }}
                    alt='movie rating'
                    src={imgs.star}
                  />
                  {movie?.vote_average ? (
                    <Typography variant='h6' sx={{ opacity: 0.8 }}>
                      <span style={{ fontWeight: 'bold' }}>
                        {movie?.vote_average &&
                          parseFloat(movie.vote_average).toFixed(1)}
                      </span>
                      /10
                    </Typography>
                  ) : (
                    <Typography
                      variant='h6'
                      sx={{ color: theme.palette.text.disabled }}
                    >
                      No rating
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* text and details */}

              <Grid item lg={7}>
                {/* title, slogan and description */}
                <Grid item xs={12}>
                  {/* title */}
                  <Typography
                    variant='h4'
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginBottom: '6px',
                      color: movie?.title
                        ? 'inherit'
                        : theme.palette.text.disabled,
                    }}
                  >
                    {movie?.title || 'No title'}
                  </Typography>

                  {/* tagline */}
                  <Typography
                    variant='h5'
                    sx={{
                      textAlign: 'center',
                      marginBottom: '12px',
                      color: movie?.tagline
                        ? 'inherit'
                        : theme.palette.text.disabled,
                    }}
                  >
                    {`• ${movie?.tagline} •` || 'No tagline'}
                  </Typography>

                  {/* description */}
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 'normal',
                      textAlign: movie?.overview ? 'left' : 'center',
                      color: movie?.overview
                        ? 'inherit'
                        : theme.palette.text.disabled,
                    }}
                  >
                    {movie?.overview || 'No description'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Details */}
            <Grid
              item
              xs={12}
              sx={{ marginBottom: '40px', alignSelf: 'flex-start' }}
            >
              <Typography variant='h5' sx={{ marginBottom: '12px' }}>
                Details
              </Typography>
              {/* #1 year, duration, language */}
              <Box sx={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                {/* year */}
                {movie?.release_date && movie.release_date !== 'null' && (
                  <>
                    <Typography variant='body1'>
                      {movie?.release_date.split('-')[0]}
                    </Typography>
                    <span style={{ lineHeight: '1.2' }}>•</span>
                  </>
                )}

                {/* duration */}
                {Number.isFinite(movie?.runtime) && movie.runtime !== 0 && (
                  <>
                    <Typography variant='body1'>
                      {`
                      ${Math.floor(movie?.runtime / 60)}h
                      ${movie?.runtime % 60}m
                    `}
                    </Typography>
                    <span style={{ lineHeight: '1.2' }}>•</span>
                  </>
                )}

                {/* language */}
                {movie?.original_language &&
                  movie.original_language !== 'null' && (
                    <Typography variant='body1'>
                      {movie?.original_language.toUpperCase()}
                    </Typography>
                  )}
              </Box>

              {/* #2 genres */}
              {movie?.genres.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginBottom: '24px',
                  }}
                >
                  {movie?.genres.map((genre) => (
                    <Link
                      to='/'
                      key={genre.id}
                      style={{
                        textDecoration: 'none',
                        color: theme.palette.text.primary,
                      }}
                    >
                      <Typography
                        onClick={() =>
                          dispatch(selectGenreOrCategory(genre.id))
                        }
                        variant='body1'
                        sx={{
                          border: `1px solid ${theme.palette.text.primary}`,
                          borderRadius: '20px',
                          padding: '0 8px 2px 8px',
                          transition: 'all 0.3s ease-out',
                          //
                          '&:hover': {
                            bgcolor:
                              theme.palette.mode === 'light'
                                ? theme.palette.dark.main
                                : '#fff',
                            color:
                              theme.palette.mode === 'light'
                                ? '#fff'
                                : theme.palette.dark.main,
                          },

                          //
                        }}
                      >
                        {genre.name}
                      </Typography>
                    </Link>
                  ))}
                </Box>
              )}

              {/* #3 trailer, website, imdb */}
              <Box
                sx={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                {/* website */}
                {movie?.homepage && (
                  <Button
                    href={movie.homepage}
                    target='_blank'
                    rel='noopener noreferrer'
                    variant='outlined'
                    endIcon={<Language />}
                    sx={{
                      color: theme.palette.text.primary,
                      borderColor: theme.palette.text.primary,
                      textTransform: 'capitalize',
                      transition: 'all 0.3s ease-out',
                      '&:hover': {
                        borderColor: theme.palette.text.primary,
                        bgcolor:
                          theme.palette.mode === 'light'
                            ? theme.palette.dark.main
                            : '#fff',
                        color:
                          theme.palette.mode === 'light'
                            ? '#fff'
                            : theme.palette.dark.main,
                      },
                    }}
                  >
                    Website
                  </Button>
                )}

                {/* trailer */}
                {movie?.videos?.results.length > 0 && (
                  <Button
                    href='#'
                    onClick={() => setOpenTrailerModal(true)}
                    variant='outlined'
                    endIcon={<Theaters />}
                    sx={{
                      color: theme.palette.text.primary,
                      borderColor: theme.palette.text.primary,
                      textTransform: 'capitalize',
                      transition: 'all 0.3s ease-out',
                      '&:hover': {
                        borderColor: theme.palette.text.primary,
                        bgcolor:
                          theme.palette.mode === 'light'
                            ? theme.palette.dark.main
                            : '#fff',
                        color:
                          theme.palette.mode === 'light'
                            ? '#fff'
                            : theme.palette.dark.main,
                      },
                    }}
                  >
                    Trailer
                  </Button>
                )}

                {/* IMDB */}
                {movie?.imdb_id && (
                  <Button
                    target='_blank'
                    rel='noopener noreferrer'
                    href={`https://www.imdb.com/title/${movie?.imdb_id}`}
                    variant='outlined'
                    endIcon={<MovieIcon />}
                    sx={{
                      color: theme.palette.text.primary,
                      borderColor: theme.palette.text.primary,
                      textTransform: 'capitalize',
                      transition: 'all 0.3s ease-out',
                      '&:hover': {
                        borderColor: theme.palette.text.primary,
                        bgcolor:
                          theme.palette.mode === 'light'
                            ? theme.palette.dark.main
                            : '#fff',
                        color:
                          theme.palette.mode === 'light'
                            ? '#fff'
                            : theme.palette.dark.main,
                      },
                    }}
                  >
                    IMDB
                  </Button>
                )}
              </Box>
            </Grid>

            {/* Top cast */}
            <Grid item xs={12} sx={{ marginBottom: '32px' }}>
              <Typography variant='h5' sx={{ marginBottom: '12px' }}>
                Top cast
              </Typography>
              <Grid container>
                {movie.credits?.cast.length > 0 ? (
                  movie.credits.cast.slice(0, 12).map((actor) => (
                    <Grid
                      onClick={() => dispatch(clearGenreOrCategory())}
                      component={Link}
                      to={`/actors/${actor.id}`}
                      key={actor.id}
                      item
                      xs={12}
                      sm={6}
                      lg={4}
                      xl={3}
                      sx={{
                        marginBottom: '12px',
                        textDecoration: 'none',
                        color: theme.palette.text.primary,
                      }}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                      >
                        <Box
                          sx={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: '#D9D9D9',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            style={{
                              objectFit: 'cover',
                              maxWidth: '100%',
                              position: 'absolute',
                              top: '60%',
                              left: '50%',
                              transform: 'translate(-50%,-50%)',
                            }}
                            alt={actor?.name}
                            src={
                              actor?.profile_path
                                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                                : imgs.defaultCastImage
                            }
                          />
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          {/* name */}
                          <Typography
                            variant='body1'
                            sx={{
                              fontWeight: 'bold',
                              color: actor?.name
                                ? 'inherit'
                                : theme.palette.text.disabled,
                            }}
                          >
                            {actor?.name || 'No name'}
                          </Typography>

                          {/* character */}
                          <Typography
                            variant='body1'
                            sx={{
                              color: actor?.character
                                ? 'inherit'
                                : theme.palette.text.disabled,
                            }}
                          >
                            {actor?.character || 'No character'}
                          </Typography>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))
                ) : (
                  <Typography
                    variant='body1'
                    sx={{ color: theme.palette.text.disabled }}
                  >
                    No cast
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* You may also like */}
            <Grid item xs={12}>
              <Typography variant='h5' sx={{ marginBottom: '12px' }}>
                You may also like
              </Typography>
              {recommendations.results.length > 0 ? (
                <MovieList movies={recommendations?.results.slice(0, 12)} />
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
              top: { xs: '-40px', md: '12px' },
              right: '16px',
              color: theme.palette.text.primary,
              borderColor: theme.palette.text.primary,
              textTransform: 'capitalize',
              transition: 'all 0.3s ease-out',
              '&:hover': {
                borderColor: theme.palette.text.primary,
                bgcolor:
                  theme.palette.mode === 'light'
                    ? theme.palette.dark.main
                    : '#fff',
                color:
                  theme.palette.mode === 'light'
                    ? '#fff'
                    : theme.palette.dark.main,
              },
            }}
            variant='outlined'
            endIcon={<ArrowBackRounded />}
          >
            Back
          </Button>

          {/* trailer modal */}
          {movie?.videos?.results.length > 0 && (
            <Modal
              closeAfterTransition
              open={openTrailerModal}
              onClose={() => setOpenTrailerModal(false)}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& .MuiBackdrop-root': {
                  backdropFilter: 'blur(8px)',
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.5)'
                      : 'rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              {movie?.videos?.results?.length > 0 && (
                <iframe
                  className='MovieInformation__video'
                  autoPlay
                  allow='autoplay'
                  frameBorder='0'
                  title='Movie trailer'
                  src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}`}
                />
              )}
            </Modal>
          )}
        </Container>
      </motion.div>
    </>
  );
}
