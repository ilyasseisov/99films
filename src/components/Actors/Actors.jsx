// mui
import { Grid, Container, Typography, Box, Button } from '@mui/material';
// mui icons
import { Movie as MovieIcon } from '@mui/icons-material';
// images
import imgs from '../../assets/imgs';
// components
import { MovieList } from '..';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
//
export default function Actors() {
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
        <Grid container>
          {/* image and text */}
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
            {/* image */}
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
              </Box>
            </Grid>

            {/* text and imdb */}

            <Grid item lg={7}>
              {/* text */}
              <Grid item xs={12} sx={{ marginBottom: '32px' }}>
                <Typography
                  variant='h4'
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: '6px',
                  }}
                >
                  Timothée Chalamet
                </Typography>

                <Typography variant='h6' sx={{ fontWeight: 'normal' }}>
                  Timothée Hal Chalamet was born in Manhattan, to Nicole
                  Flender, a real estate broker and dancer, and Marc Chalamet, a
                  UNICEF editor. His mother, who is from New York, is Jewish, of
                  Russian Jewish and Austrian Jewish descent. His father, who is
                  from Nîmes, France, is of French and English ancestry. He is
                  the brother of actress Pauline Chalamet, a nephew of director
                  Rodman Flender, and a grandson of screenwriter Harold Flender.
                  He grew up in an artistic family, appearing in commercials and
                  the New York theatre scene, and attending the LaGuardia High
                  School of Music, Art and Performing Arts, where his classmate
                  and friend was actor Ansel Elgort (the two later received
                  their first Golden Globe nominations in the same year, 2017).
                  For a time, Timothée also attended Columbia University. He
                  made his film debut in 2014, as a high school student in Jason
                  Reitman's Men, Women & Children (2014) and Matthew
                  McConaughey's character's teenage son in Interstellar (2014).
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
                <Box
                  sx={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
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

          {/* You may also like */}
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ marginBottom: '12px' }}>
              Movies
            </Typography>
            <MovieList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
