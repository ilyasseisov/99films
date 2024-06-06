// mui
import { Typography, Box } from '@mui/material';
// router
import { Link } from 'react-router-dom';
// images
import imgs from '../../assets/imgs';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';

export default function MovieSingle() {
  // hooks
  const theme = useTheme();
  // local variables
  // functions
  // return
  return (
    <>
      <Link
        to='google.com'
        style={{
          textDecoration: 'none',
          color: theme.palette.text.primary,
        }}
      >
        <Box
          sx={{
            padding: { sm: '20px 20px 20px 0px' },
            marginBottom: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            alt={'movie title'}
            src={imgs.defaultMovieImage}
            style={{
              width: '200px',
              marginBottom: '12px',
              borderRadius: '12px',
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <img style={{ width: '32px' }} alt='movie rating' src={imgs.star} />
            <Typography variant='h6' sx={{ opacity: 0.8 }}>
              8.5
            </Typography>
          </Box>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Movie name
          </Typography>
        </Box>
      </Link>
    </>
  );
}
