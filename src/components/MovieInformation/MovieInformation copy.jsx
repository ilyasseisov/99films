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
// useState
import { useState, useEffect } from 'react';
// router
import { Link, useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
// axios
import axios from 'axios';
// rtk query hooks
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from '../../services/TMDB';
// redux actions
import { selectGenreOrCategory } from '../../features/currentGenreOrCategorySlice';

export default function MovieInformation() {
  //// hooks
  // redux
  const { user } = useSelector((state) => state.user);
  // mui theme
  const theme = useTheme();
  // useState
  const [openTrailerModal, setOpenTrailerModal] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
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

  // to know whether movie is in favorite or watchlist

  useEffect(() => {
    if (movie) {
      setIsMovieFavorited(
        !!favoriteMovies?.results?.find((movie) => movie.id === movie?.id)
      );
    }
  }, [favoriteMovies, movie]);

  useEffect(() => {
    if (movie) {
      setIsMovieWatchlisted(
        !!watchlistMovies?.results?.find((movie) => movie.id === movie?.id)
      );
    }
  }, [watchlistMovies, movie]);

  // redux
  const dispatch = useDispatch();
  // local variables
  const tmdbApiKey = 'c3e422a2ea4fbce1b97cbebce6616f71';
  // functions
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
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  }
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
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  }
  // return

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

  // primary return
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
                  onClick={addToFavorites}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                  }}
                >
                  {isMovieFavorited ? (
                    <FavoriteRounded
                      sx={{ fontSize: 32, color: theme.palette.primary.main }}
                    />
                  ) : (
                    <FavoriteBorderRounded
                      sx={{ fontSize: 32, color: theme.palette.primary.main }}
                    />
                  )}
                </IconButton>

                {/* add to watchlist */}
                <IconButton
                  onClick={addToWatchlist}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                  }}
                >
                  {isMovieWatchlisted ? (
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
                <Typography variant='h6' sx={{ opacity: 0.8 }}>
                  <span style={{ fontWeight: 'bold' }}>
                    {parseFloat(movie.vote_average).toFixed(1)}
                  </span>
                  /10
                </Typography>
              </Box>
            </Grid>

            {/* text and details */}

            <Grid item lg={7}>
              {/* name, slogan and description */}
              <Grid item xs={12} sx={{ marginBottom: '32px' }}>
                <Typography
                  variant='h4'
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: '6px',
                  }}
                >
                  {movie?.title}
                </Typography>
                <Typography
                  variant='h5'
                  sx={{ textAlign: 'center', marginBottom: '12px' }}
                >
                  • {movie?.tagline} •
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: 'normal' }}>
                  {movie?.overview}
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

                {/* #1 year, duration, language */}
                <Box
                  sx={{ display: 'flex', gap: '12px', marginBottom: '12px' }}
                >
                  <Typography variant='body1'>
                    {movie?.release_date.split('-')[0]}
                  </Typography>
                  <span style={{ lineHeight: '1.2' }}>•</span>
                  <Typography variant='body1'>
                    {`
                      ${Math.floor(movie?.runtime / 60)}h
                      ${movie?.runtime % 60}m
                    `}
                  </Typography>
                  <span style={{ lineHeight: '1.2' }}>•</span>
                  <Typography variant='body1'>
                    {movie?.original_language.toUpperCase()}
                  </Typography>
                </Box>

                {/* #2 genres */}
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
                          padding: '0 6px 0 6px',
                        }}
                      >
                        {genre.name}
                      </Typography>
                    </Link>
                  ))}
                </Box>

                {/* #3 trailer, website, imdb */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* website */}
                  <Button
                    href={movie?.homepage}
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

                  {/* trailer */}
                  <Button
                    href='#'
                    onClick={() => setOpenTrailerModal(true)}
                    variant='outlined'
                    endIcon={<Theaters />}
                    disabled={!movie?.videos?.results.length}
                    sx={{
                      color: theme.palette.text.primary,
                      borderColor: theme.palette.text.primary,
                      textTransform: 'capitalize',
                      '&:hover': { borderColor: theme.palette.text.primary },
                    }}
                  >
                    Trailer
                  </Button>

                  {/* IMDB */}
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
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Top cast */}
          <Grid item xs={12} sx={{ marginBottom: '32px' }}>
            <Typography variant='h5' sx={{ marginBottom: '12px' }}>
              Top cast
            </Typography>
            <Grid container>
              {movie &&
                movie.credits?.cast.slice(0, 12).map((actor) => (
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

                    <Box>
                      <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                        {actor?.name}
                      </Typography>
                      <Typography variant='body1'>
                        {actor?.character}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/* You may also like */}
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ marginBottom: '12px' }}>
              You may also like
            </Typography>
            {recommendations ? (
              <MovieList movies={recommendations?.results.slice(0, 12)} />
            ) : (
              <Typography>Sorry nothing was found</Typography>
            )}
          </Grid>
        </Grid>

        {/* trailer modal */}
        {movie?.videos?.results.length && (
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
