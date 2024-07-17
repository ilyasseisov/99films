// react
import { useContext, useState, useEffect } from 'react';
// mui icons
import { Menu, DarkModeOutlined, LightMode } from '@mui/icons-material';
// mui
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Button,
} from '@mui/material';

// useTheme (mui)
import { useTheme } from '@mui/material/styles';

// react router
import { Link } from 'react-router-dom';

// react redux
import { useDispatch, useSelector } from 'react-redux';

// components
import { Sidebar, Search } from '..';

// color mode context
import { ColorModeContext } from '../../utils/ToggleColorMode';

// auth
import { fetchToken, createSessionId, moviesApi } from '../../utils/auth';
import { setUser } from '../../features/authSlice';

export default function Navbar() {
  // hooks
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const dispatch = useDispatch();

  // to use below for sidebar action
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  // to close sidebar when category is selected
  useEffect(() => {
    setIsDrawerOpened(false);
  }, [genreIdOrCategoryName]);

  // auth
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const tokenFromLocalStorage = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    async function logInUser() {
      if (tokenFromLocalStorage) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );

          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );

          dispatch(setUser(userData));
        }
      }
    }

    logInUser();
  }, [tokenFromLocalStorage]);

  // local variables
  // functions
  function toggleDrawer() {
    setIsDrawerOpened((prev) => !prev);
  }
  // return
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='fixed'
          elevation={0}
          sx={{
            bgcolor:
              theme.palette.mode === 'light'
                ? theme.palette.primary.main
                : theme.palette.primary.dark,
            padding: { xs: '8px 0px 20px 0px', md: '8px 0px 8px 0px' },
          }}
        >
          <Toolbar>
            <Grid container>
              <Grid
                item
                xs={6}
                md={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  order: { xs: '1', md: '1' },
                }}
              >
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='open drawer'
                  sx={{ display: { xs: 'block', md: 'none' } }}
                  onClick={toggleDrawer}
                >
                  <Menu />
                </IconButton>

                <Typography
                  component={Link}
                  to='/'
                  variant='h6'
                  noWrap
                  sx={{
                    flexGrow: 1,
                    textDecoration: 'none',
                    color: theme.palette.light.main,
                  }}
                >
                  Logo
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  order: { xs: '3', md: '2' },
                }}
              >
                {/* search */}
                <Search />
              </Grid>

              <Grid
                item
                xs={6}
                md={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  order: { xs: '2', md: '3' },
                }}
              >
                {isAuthenticated ? (
                  <>
                    <Button
                      component={Link}
                      to={`/profile/${user.id}`}
                      sx={{
                        color: '#fff',
                        borderColor: '#fff',
                        '&:hover': {
                          borderColor: '#fff',
                        },
                      }}
                      variant='outlined'
                    >
                      Account
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={fetchToken}
                    sx={{
                      color: '#fff',
                      borderColor: '#fff',
                      '&:hover': {
                        borderColor: '#fff',
                      },
                    }}
                    variant='outlined'
                  >
                    Login
                  </Button>
                )}

                <IconButton
                  size='large'
                  edge='end'
                  color='inherit'
                  aria-label='theme color mode'
                  sx={{ marginLeft: '12px' }}
                  onClick={colorMode.toggleColorMode}
                >
                  {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlined />
                  ) : (
                    <LightMode />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(8px)',
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(0, 0, 0, 0.5)',
          },
        }}
        open={isDrawerOpened}
        anchor='right'
        onClose={() => {
          setIsDrawerOpened((prev) => !prev);
        }}
        PaperProps={{
          sx: { width: { xs: '80%', sm: '300px' } },
        }}
      >
        <Sidebar />
      </Drawer>
    </>
  );
}
