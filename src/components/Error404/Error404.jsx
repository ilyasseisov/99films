// mui
import { Box, Button } from '@mui/material';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
// router
import { useNavigate } from 'react-router-dom';
// lottie
import Lottie from 'react-lottie';
// animation data
import animationData from '../../assets/lottie/404.json';
export default function Error404() {
  // hooks
  // mui
  const theme = useTheme();
  // router - to navigate Home
  const navigate = useNavigate();
  // local variables
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  // functions
  const handleGoHome = () => {
    navigate('/');
  };
  // return
  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: { xs: '300px', sm: '400px' },
            height: { xs: '300px', sm: '400px' },
            marginBottom: '40px',
          }}
        >
          <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
        </Box>
        <Button
          onClick={handleGoHome}
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
          size='large'
        >
          Go Home
        </Button>
      </Box>
    </>
  );
}
