// mui
import { Typography, Box, Grow } from '@mui/material';
// router
import { Link } from 'react-router-dom';
// images
import imgs from '../../assets/imgs';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';

export default function MovieSingle({ movie, index }) {
  // hooks
  const theme = useTheme();
  // local variables
  // functions
  // return
  return (
    <>
      <Grow
        in
        timeout={(index + 1) * 200}
        style={{ transformOrigin: 'center' }}
        easing={'ease-out'}
      >
        <Link
          to={`/movie/${movie?.id}`}
          style={{
            textDecoration: 'none',
            color: theme.palette.text.primary,
          }}
        >
          <Box
            sx={{
              padding: { sm: '20px' },
              marginBottom: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              alt={'movie title'}
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : imgs.defaultMovieImage
              }
              style={{
                width: '200px',
                marginBottom: '12px',
                borderRadius: '12px',
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img
                style={{ width: '32px' }}
                alt='movie rating'
                src={imgs.star}
              />
              <Typography variant='h6' sx={{ opacity: 0.8 }}>
                {parseFloat(movie?.vote_average).toFixed(1)}
              </Typography>
            </Box>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                maxWidth: '80%',
                fontSize: { xs: '18px', sm: '20px' },
              }}
            >
              {movie?.title}
            </Typography>
          </Box>
        </Link>
      </Grow>
    </>
  );
}
