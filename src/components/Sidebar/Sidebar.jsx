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
    return <Typography>Fetching...</Typography>;
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
          bgcolor: theme.palette.action.hover,
          position: 'fixed',
          overflowY: 'auto',
          height: '100%',
          width: { xs: '100%', md: '33.333%', lg: '25%', xl: '16.666%' },
          paddingBottom: '20px',
        }}
      >
        {/* categories */}
        <List>
          <ListSubheader sx={{ bgcolor: 'inherit' }}>Categories</ListSubheader>

          {categories.map((category) => (
            <Link
              to='/'
              key={category.id}
              style={{
                textDecoration: 'none',
                color: theme.palette.text.primary,
              }}
            >
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(category.id))}
              >
                <ListItemIcon>
                  <SlideshowRounded
                    sx={{ fontSize: 32, color: theme.palette.text.primary }}
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
          <ListSubheader sx={{ bgcolor: 'inherit' }}>Genres</ListSubheader>

          {data?.genres?.map((genre) => (
            <Link
              to='/'
              key={genre.id}
              style={{
                textDecoration: 'none',
                color: theme.palette.text.primary,
              }}
            >
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                <ListItemIcon>
                  <SlideshowRounded
                    sx={{ fontSize: 32, color: theme.palette.text.primary }}
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
