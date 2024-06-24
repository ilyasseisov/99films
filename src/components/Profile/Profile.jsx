// react hooks
import { useEffect } from 'react';
// redux
import { useSelector } from 'react-redux';
// rtk query hooks
import { useGetListQuery } from '../../services/TMDB';
// mui
import { Container, Grid, Box, Button, Typography } from '@mui/material';
// mui icons
import { ExitToAppRounded } from '@mui/icons-material';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
// components
import { MovieList } from '..';
//
export default function Profile() {
  // hooks
  const theme = useTheme();

  const { user } = useSelector((state) => state.user);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: 'watchlist/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    });

  // to have updates on page reload (rtk query functionality)
  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  // local variables
  // functions
  function logout() {
    localStorage.clear();
    window.location.href = '/';
  }
  // return
  return (
    <>
      <Container
        maxWidth='xxl'
        sx={{ padding: { xs: '12px', md: '32px 12px 12px 12px' } }}
      >
        {/* title and logout */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '64px',
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            My movies
          </Typography>
          <Button
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.text.primary,
              textTransform: 'capitalize',
              '&:hover': { borderColor: theme.palette.text.primary },
            }}
            variant='outlined'
            startIcon={<ExitToAppRounded />}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>

        {/* favorite movies */}
        <Grid item xs={12} sx={{ marginBottom: '32px' }}>
          <Typography variant='h5' sx={{ marginBottom: '16px' }}>
            Favorite
          </Typography>
          {favoriteMovies?.results.length > 0 ? (
            <MovieList movies={favoriteMovies?.results} />
          ) : (
            <Typography
              variant='h6'
              sx={{ color: theme.palette.text.disabled }}
            >
              No favorite movies
            </Typography>
          )}
          <MovieList movies={favoriteMovies?.results} />
        </Grid>

        {/* watchlist */}
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ marginBottom: '16px' }}>
            Watchlist
          </Typography>
          {watchlistMovies?.results.length > 0 ? (
            <MovieList movies={watchlistMovies?.results} />
          ) : (
            <Typography
              variant='h6'
              sx={{ color: theme.palette.text.disabled }}
            >
              No watchlist movies
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
