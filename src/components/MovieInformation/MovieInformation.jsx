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
import { useState } from 'react';

export default function MovieInformation() {
  // hooks
  const theme = useTheme();
  const [openTrailerModal, setOpenTrailerModal] = useState(false);
  // local variables
  // functions
  // return
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
              <Box sx={{ marginBottom: '16px', position: 'relative' }}>
                <img
                  alt={'movie title'}
                  src={imgs.defaultMovieImage}
                  style={{
                    borderRadius: '12px',
                  }}
                  className='MovieInformation__cover'
                />
                <IconButton
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                  }}
                >
                  <FavoriteBorderRounded
                    sx={{ fontSize: 32, color: theme.palette.text.primary }}
                  />
                </IconButton>

                <IconButton
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                  }}
                >
                  <StarBorderRounded
                    sx={{ fontSize: 32, color: theme.palette.text.primary }}
                  />
                </IconButton>
              </Box>
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
                  <span style={{ fontWeight: 'bold' }}>8.5</span>/10
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
                  Dune: Part Two
                </Typography>
                <Typography
                  variant='h5'
                  sx={{ textAlign: 'center', marginBottom: '12px' }}
                >
                  • Long live the fighters •
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: 'normal' }}>
                  Follow the mythic journey of Paul Atreides as he unites with
                  Chani and the Fremen while on a path of revenge against the
                  conspirators who destroyed his family. Facing a choice between
                  the love of his life and the fate of the known universe, Paul
                  endeavors to prevent a terrible future only he can foresee.
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
                  <Typography variant='body1'>2024</Typography>
                  <span style={{ lineHeight: '1.2' }}>•</span>
                  <Typography variant='body1'>2h46m</Typography>
                  <span style={{ lineHeight: '1.2' }}>•</span>
                  <Typography variant='body1'>English</Typography>
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
                  <Typography
                    variant='body1'
                    sx={{
                      border: `1px solid ${theme.palette.text.primary}`,
                      borderRadius: '20px',
                      padding: '0 6px 0 6px',
                    }}
                  >
                    Science Fiction
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      border: `1px solid ${theme.palette.text.primary}`,
                      borderRadius: '20px',
                      padding: '0 6px 0 6px',
                    }}
                  >
                    Adventure
                  </Typography>
                </Box>

                {/* #3 trailer, website, imdb */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <Button
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
                  <Button
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
                  <Button
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
              <Grid
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
                    style={{ objectFit: 'cover', maxWidth: '100%' }}
                    alt={'actor name'}
                    src={imgs.actor}
                  />
                </Box>

                <Box>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Timothée Chalamet
                  </Typography>
                  <Typography variant='body1'>Paul Atreides</Typography>
                </Box>
              </Grid>

              <Grid
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
                    alt={'actor name'}
                    src={imgs.defaultActorImage}
                  />
                </Box>

                <Box>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Timothée Chalamet
                  </Typography>
                  <Typography variant='body1'>Paul Atreides</Typography>
                </Box>
              </Grid>

              <Grid
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
                    style={{ objectFit: 'cover', maxWidth: '100%' }}
                    alt={'actor name'}
                    src={imgs.actor}
                  />
                </Box>

                <Box>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Timothée Chalamet
                  </Typography>
                  <Typography variant='body1'>Paul Atreides</Typography>
                </Box>
              </Grid>

              <Grid
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
                    alt={'actor name'}
                    src={imgs.defaultActorImage}
                  />
                </Box>

                <Box>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Timothée Chalamet
                  </Typography>
                  <Typography variant='body1'>Paul Atreides</Typography>
                </Box>
              </Grid>

              <Grid
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
                    style={{ objectFit: 'cover', maxWidth: '100%' }}
                    alt={'actor name'}
                    src={imgs.actor}
                  />
                </Box>

                <Box>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Timothée Chalamet
                  </Typography>
                  <Typography variant='body1'>Paul Atreides</Typography>
                </Box>
              </Grid>

              <Grid
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
                    alt={'actor name'}
                    src={imgs.defaultActorImage}
                  />
                </Box>

                <Box>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Timothée Chalamet
                  </Typography>
                  <Typography variant='body1'>Paul Atreides</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* You may also like */}
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ marginBottom: '12px' }}>
              You may also like
            </Typography>
            <MovieList />
          </Grid>
        </Grid>

        {/* modal */}
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
          <iframe
            className='MovieInformation__video'
            autoPlay
            allow='autoplay'
            frameBorder='0'
            title='Movie trailer'
            src='https://www.youtube.com/embed/_YUzQa_1RCE?si=55LxY2Qn9cvMYv1V'
          />
        </Modal>
      </Container>
    </>
  );
}
