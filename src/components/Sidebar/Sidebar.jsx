// mui
import {
  Divider,
  Box,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Skeleton,
} from '@mui/material';
// mui icons
import { SlideshowRounded } from '@mui/icons-material';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
// router
import { Link } from 'react-router-dom';
// rtk query hooks
import { useGetGenresQuery } from '../../services/TMDB';
// react redux hooks
import { useDispatch, useSelector } from 'react-redux';
// framer
import { motion } from 'framer-motion';
// redux actions
import { selectGenreOrCategory } from '../../features/currentGenreOrCategorySlice';
// framer animations
import {
  sidebarContainerAnimation,
  sidebarChildrenAnimation,
} from '../../utils/framerAnimations';
//
// categories (hardcoded)
const categories = [
  { name: 'Popular', id: 'popular' },
  { name: 'Top Rated', id: 'top_rated' },
  { name: 'Upcoming', id: 'upcoming' },
];

export default function Sidebar() {
  // hooks
  // mui theme
  const theme = useTheme();
  // rtk query
  const { data, isFetching, error } = useGetGenresQuery();
  // redux
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  // local variables

  // functions

  // while fetching stage
  if (isFetching) {
    return (
      <>
        {[...Array(20)].map((_, index) => (
          <ListItemButton key={index}>
            <ListItemIcon>
              <Skeleton variant='circular' width={32} height={32} />
            </ListItemIcon>
            <ListItemText
              primary={<Skeleton variant='text' width={'100%'} height={32} />}
            />
          </ListItemButton>
        ))}
      </>
    );
  }

  // if no movies were returned
  if (!data.genres.length) {
    return (
      <>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: theme.palette.text.disabled }} variant='p'>
            No categories
          </Typography>
        </Box>
      </>
    );
  }

  // if error
  if (error) {
    return (
      <>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: theme.palette.text.disabled }} variant='p'>
            Error fetching categories
          </Typography>
        </Box>
      </>
    );
  }

  // primary return
  // return
  return (
    <>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={sidebarContainerAnimation}
      >
        <Box
          sx={{
            bgcolor:
              theme.palette.mode === 'light'
                ? theme.palette.dark.main
                : theme.palette.dark.dark,
            position: 'fixed',
            overflowY: 'auto',
            height: '100%',
            width: { xs: '100%', md: '33.333%', lg: '25%', xl: '16.666%' },
          }}
        >
          {/* categories */}
          <List>
            <motion.div variants={sidebarChildrenAnimation}>
              <ListSubheader
                disableSticky
                sx={{ bgcolor: 'inherit', color: theme.palette.light.main }}
              >
                Categories
              </ListSubheader>
            </motion.div>

            {categories.map((category) => (
              <motion.div key={category.id} variants={sidebarChildrenAnimation}>
                <Link
                  to='/'
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.light.main,
                  }}
                >
                  <ListItemButton
                    onClick={() => dispatch(selectGenreOrCategory(category.id))}
                    selected={category.id === genreIdOrCategoryName}
                    sx={{
                      '&:hover': {
                        bgcolor:
                          theme.palette.mode === 'light'
                            ? theme.palette.primary.dark
                            : theme.palette.primary.main,
                      },
                      '&.Mui-selected': {
                        bgcolor:
                          theme.palette.mode === 'light'
                            ? theme.palette.primary.main
                            : theme.palette.primary.dark,
                        color: theme.palette.light.main,
                        '&:hover': {
                          bgcolor:
                            theme.palette.mode === 'light'
                              ? theme.palette.primary.main
                              : theme.palette.primary.dark,
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <SlideshowRounded
                        sx={{ fontSize: 32, color: theme.palette.light.main }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: 20,
                      }}
                      primary={category.name}
                    />
                  </ListItemButton>
                </Link>
              </motion.div>
            ))}
          </List>

          <Divider />

          {/* genres */}
          <List sx={{ marginBottom: '100px' }}>
            <motion.div variants={sidebarChildrenAnimation}>
              <ListSubheader
                disableSticky
                sx={{ bgcolor: 'inherit', color: theme.palette.light.main }}
              >
                Genres
              </ListSubheader>
            </motion.div>

            {data?.genres?.map((genre) => (
              <motion.div key={genre.id} variants={sidebarChildrenAnimation}>
                <Link
                  to='/'
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.light.main,
                  }}
                  className={genre.id === genreIdOrCategoryName ? 'active' : ''}
                >
                  <ListItemButton
                    onClick={() => dispatch(selectGenreOrCategory(genre.id))}
                    selected={genre.id === genreIdOrCategoryName}
                    sx={{
                      '&:hover': {
                        bgcolor:
                          theme.palette.mode === 'light'
                            ? theme.palette.primary.dark
                            : theme.palette.primary.main,
                      },
                      '&.Mui-selected': {
                        bgcolor:
                          theme.palette.mode === 'light'
                            ? theme.palette.primary.main
                            : theme.palette.primary.dark,
                        color: theme.palette.light.main,
                        '&:hover': {
                          bgcolor:
                            theme.palette.mode === 'light'
                              ? theme.palette.primary.main
                              : theme.palette.primary.dark,
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <SlideshowRounded
                        sx={{ fontSize: 32, color: theme.palette.light.main }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: 20,
                      }}
                      primary={genre.name}
                    />
                  </ListItemButton>
                </Link>
              </motion.div>
            ))}
          </List>
        </Box>
      </motion.div>
    </>
  );
}
