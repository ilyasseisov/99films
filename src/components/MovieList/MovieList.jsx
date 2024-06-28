import { Grid } from '@mui/material';
// components
import { MovieSingle } from '..';

export default function MovieList({ movies }) {
  // hooks
  // local variables
  // functions
  // return
  return (
    <>
      <Grid container>
        {movies?.map((movie, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            xl={3}
            xxl={2}
            key={movie.id}
            sx={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: {
                xs: 'center',
              },
            }}
          >
            <MovieSingle movie={movie} index={index} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
