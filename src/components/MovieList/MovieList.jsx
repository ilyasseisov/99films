// mui
import { Grid } from '@mui/material';
// framer
import { motion } from 'framer-motion';
// redux
import { useDispatch, useSelector } from 'react-redux';
// redux actions
import { clearGenreOrCategory } from '../../features/currentGenreOrCategorySlice';
// components
import { MovieSingle } from '..';
// framer animations
import {
  moviesContainerAnimation,
  moviesChildrenAnimation,
} from '../../utils/framerAnimations';

export default function MovieList({ movies }) {
  // hooks
  // redux
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  // local variables
  // functions
  // return
  return (
    <>
      <motion.div
        key={genreIdOrCategoryName}
        initial='hidden'
        animate='visible'
        variants={moviesContainerAnimation}
      >
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
                variants={moviesChildrenAnimation}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <MovieSingle
                  onClick={() => dispatch(clearGenreOrCategory())}
                  movie={movie}
                  index={index}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </>
  );
}
