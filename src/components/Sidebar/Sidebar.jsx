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
// redux actions
import { selectGenreOrCategory } from '../../features/currentGenreOrCategorySlice';
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
    return <Typography>No categories</Typography>;
  }

  // if error
  if (error) {
    return <Typography>Error</Typography>;
  }

  // primary return
  // return
  return (
    <>
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
          paddingBottom: '20px',
        }}
      >
        {/* categories */}
        <List>
          <ListSubheader
            disableSticky
            sx={{ bgcolor: 'inherit', color: theme.palette.light.main }}
          >
            Categories
          </ListSubheader>

          {categories.map((category) => (
            <Link
              to='/'
              key={category.id}
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
                    backgroundColor: theme.palette.primary.dark,
                  },
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.light.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
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
          ))}
        </List>

        <Divider />

        {/* genres */}
        <List>
          <ListSubheader
            disableSticky
            sx={{ bgcolor: 'inherit', color: theme.palette.light.main }}
          >
            Genres
          </ListSubheader>

          {data?.genres?.map((genre) => (
            <Link
              to='/'
              key={genre.id}
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
                    backgroundColor: theme.palette.primary.dark,
                  },
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.light.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
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
          ))}
        </List>
      </Box>
    </>
  );
}
