import { Grid } from '@mui/material';
// components
import { MovieSingle } from '..';

export default function MovieList({ centerAlign }) {
  // hooks
  // local variables
  // functions
  // return
  return (
    <>
      <Grid container>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: centerAlign ? 'center' : 'flex-start',
            },
          }}
          item
          xs={12}
          sm={6}
          lg={4}
          xl={3}
          xxl={2}
        >
          <MovieSingle />
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: centerAlign ? 'center' : 'flex-start',
            },
          }}
          item
          xs={12}
          sm={6}
          lg={4}
          xl={3}
          xxl={2}
        >
          <MovieSingle />
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: centerAlign ? 'center' : 'flex-start',
            },
          }}
          item
          xs={12}
          sm={6}
          lg={4}
          xl={3}
          xxl={2}
        >
          <MovieSingle />
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: centerAlign ? 'center' : 'flex-start',
            },
          }}
          item
          xs={12}
          sm={6}
          lg={4}
          xl={3}
          xxl={2}
        >
          <MovieSingle />
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: centerAlign ? 'center' : 'flex-start',
            },
          }}
          item
          xs={12}
          sm={6}
          lg={4}
          xl={3}
          xxl={2}
        >
          <MovieSingle />
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: centerAlign ? 'center' : 'flex-start',
            },
          }}
          item
          xs={12}
          sm={6}
          lg={4}
          xl={3}
          xxl={2}
        >
          <MovieSingle />
        </Grid>
      </Grid>
    </>
  );
}
