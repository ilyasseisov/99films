// mui
import { Grid } from '@mui/material';
// framer
import { motion } from 'framer-motion';
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
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <MovieSingle movie={movie} index={index} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
