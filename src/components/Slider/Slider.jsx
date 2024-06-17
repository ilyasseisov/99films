// react hooks
import { useEffect, useRef } from 'react';
// swiper
import { register } from 'swiper/element/bundle';
// mui
import { Box, Typography, Button } from '@mui/material';
// router
import { Link } from 'react-router-dom';
// images
import imgs from '../../assets/imgs';

export default function Slider({ movies }) {
  // hooks
  const swiperRef = useRef(null);

  useEffect(() => {
    // Register Swiper web component
    register();

    // initialize swiper
    swiperRef.current.initialize();
  }, []);
  // local variables
  console.log(movies);
  // functions
  // return
  return (
    <>
      <swiper-container
        ref={swiperRef}
        speed='500'
        loop='true'
        pagination='true'
        pagination-clickable='true'
        autoplay='true'
        autoplay-delay='5000'
        space-between='100'
        style={{
          '--swiper-pagination-color': '#fff',
          '--swiper-pagination-bullet-width': '48px',
          '--swiper-pagination-bullet-height': '6px',
          '--swiper-pagination-bullet-border-radius': '20px',
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-bullet-inactive-color': '#fff',
          '--swiper-pagination-bullet-inactive-opacity': '0.2',
        }}
      >
        {movies.map((movie) => (
          <swiper-slide key={movie.id}>
            {/* img */}
            <Box className='img-container'>
              <img
                alt={movie?.name}
                src={
                  movie?.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    : imgs.defaultSliderImage
                }
              />
            </Box>
            {/* info */}
            <Box
              sx={{
                width: { xs: '100%', xl: 'auto' },
                position: 'absolute',
                top: '80%',
                left: { xs: '0', xl: '60px' },
                transform: 'translateY(-80%)',
                zIndex: 2,
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: { xs: 'center', xl: 'flex-start' },
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '32px', sm: '40px', lg: '48px', xl: '60px' },
                  marginBottom: '24px',
                  textAlign: { xs: 'center', xl: 'left' },
                  maxWidth: { xs: '90%', xl: '100%' },
                }}
                variant='h3'
              >
                {movie?.title}
              </Typography>
              <Button
                component={Link}
                to={`/movie/${movie.id}`}
                size='medium'
                variant='contained'
                sx={{
                  textTransform: 'initial',
                  fontSize: { xs: '16px', lg: '20px' },
                }}
              >
                Learn more
              </Button>
            </Box>
          </swiper-slide>
        ))}
      </swiper-container>
    </>
  );
}
