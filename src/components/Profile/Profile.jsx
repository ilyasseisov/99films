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
  // local variables
  // functions
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
          >
            Logout
          </Button>
        </Box>

        {/* favorite movies */}
        <Grid item xs={12} sx={{ marginBottom: '32px' }}>
          <Typography variant='h5' sx={{ marginBottom: '16px' }}>
            Favorite
          </Typography>
          <MovieList />
        </Grid>

        {/* watchlist */}
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ marginBottom: '16px' }}>
            Watchlist
          </Typography>
          <MovieList />
        </Grid>
      </Container>
    </>
  );
}
