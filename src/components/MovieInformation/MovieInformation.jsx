// mui
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
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
} from '@mui/icons-material';
// images
import imgs from '../../assets/imgs';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
// components
import { MovieList } from '..';
// react hooks
import { useState, useEffect } from 'react';
// router
import { Link, useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
// rtk query hooks
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from '../../services/TMDB';
// redux actions
import { selectGenreOrCategory } from '../../features/currentGenreOrCategorySlice';
// axios
import axios from 'axios';
export default function MovieInformation() {
  // redux
  const { user } = useSelector((state) => state.user);
  // mui theme
  const theme = useTheme();
  // state for trailer modal
  const [openTrailerModal, setOpenTrailerModal] = useState(false);
  // state for movie status (fav/watchlist)
  const [movieStatus, setMovieStatus] = useState({});
  // router - to get param from URL
  const { id } = useParams();
  //// rtk query
  // single movie
  const { data: movie, isFetching, error } = useGetMovieQuery(id);
  // recommendations
  const {
    data: recommendations,
    isFetching: isRecommendationsFetching,
    error: recommendationsError,
  } = useGetRecommendationsQuery({
    list: '/recommendations',
    movieId: id,
  });
  // user favorite movies
  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  // user watchlist movies
  const { data: watchlistMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

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

  // redux
  const dispatch = useDispatch();
  // local variables
  const tmdbApiKey = 'c3e422a2ea4fbce1b97cbebce6616f71';

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

  // while fetching stage
  if (isFetching) {
    return <Typography>Fetching...</Typography>;
  }

  // if error
  if (error) {
    return <Typography>Error</Typography>;
  }

  // while fetching stage (recommendations)
  if (isRecommendationsFetching) {
    return <Typography>Fetching...</Typography>;
  }

  // if error (recommendations)
  if (recommendationsError) {
    return <Typography>Error</Typography>;
  }

  return (
    <>
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
                <IconButton
                  disableRipple
                  onClick={addToFavorites}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                  }}
                >
                  {movieStatus[movie.id]?.isFavorited ? (
                    <FavoriteRounded
                      sx={{ fontSize: 32, color: theme.palette.primary.main }}
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
                {/* add to watchlist */}
                <IconButton
                  disableRipple
                  onClick={addToWatchlist}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
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
                      onClick={() => dispatch(selectGenreOrCategory(genre.id))}
                      variant='body1'
                      sx={{
                        border: `1px solid ${theme.palette.text.primary}`,
                        borderRadius: '20px',
                        padding: '0 6px 0 6px',
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
                    '&:hover': { borderColor: theme.palette.text.primary },
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
                    '&:hover': { borderColor: theme.palette.text.primary },
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
                    '&:hover': { borderColor: theme.palette.text.primary },
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
                    component={Link}
                    to={`/actors/${actor.id}`}
                    key={actor.id}
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    xl={3}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                      textDecoration: 'none',
                      color: theme.palette.text.primary,
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
    </>
  );
}
