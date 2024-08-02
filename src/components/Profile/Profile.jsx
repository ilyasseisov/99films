// react hooks
import { useEffect } from 'react';
// redux
import { useSelector } from 'react-redux';
// rtk query hooks
import { useGetListQuery } from '../../services/TMDB';
// react router
import { useNavigate } from 'react-router-dom';
// mui
import { Container, Grid, Box, Button, Typography } from '@mui/material';
// mui icons
import { ExitToAppRounded } from '@mui/icons-material';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
// framer
import { motion } from 'framer-motion';
// components
import { MovieList } from '..';
//
// framer animation
import { containerAnimationFromBottom } from '../../utils/framerAnimations';
//
export default function Profile() {
  // hooks
  const theme = useTheme();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
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

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // to have updates on page reload (rtk query functionality)
  useEffect(() => {
    if (user?.id) {
      refetchFavorites();
      refetchWatchlisted();
    }
  }, [refetchFavorites, refetchWatchlisted, user?.id]);

  // local variables

  // functions
  function logout() {
    localStorage.clear();
    window.location.href = '/';
  }
  // return
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
                transition: 'all 0.3s ease-out',
                '&:hover': {
                  borderColor: theme.palette.text.primary,
                  bgcolor: theme.palette.text.primary,
                  color: '#fff',
                },
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
      </motion.div>
    </>
  );
}
