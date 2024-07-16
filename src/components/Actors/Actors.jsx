// mui
import { Grid, Container, Typography, Box, Button } from '@mui/material';
// mui icons
import { Movie as MovieIcon } from '@mui/icons-material';
// images
import imgs from '../../assets/imgs';
// components
import { MovieList, PaginationCustom } from '..';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
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
import { useParams } from 'react-router-dom';
export default function Actors() {
  // hooks

  // mui
  const theme = useTheme();
  // router
  const { id } = useParams();
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

  // local variables
  // functions
  const splitText = (text) => {
    return text.split('\n').filter((part) => part.trim() !== '');
  };
  // return

  // while fetching stage
  if (isFetching) {
    return <Typography>Fetching...</Typography>;
  }

  // if error
  if (error) {
    return <Typography>Error</Typography>;
  }

  // while fetching stage (movies)
  if (isFetchingMovies) {
    return <Typography>Fetching...</Typography>;
  }

  // if error (movies)
  if (moviesError) {
    return <Typography>Error</Typography>;
  }

  // primary return
  return (
    <>
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
                        '&:hover': { borderColor: theme.palette.text.primary },
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
    </>
  );
}
