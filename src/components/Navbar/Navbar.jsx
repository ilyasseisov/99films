// react
import { useContext, useState } from 'react';
// mui
import {
  Menu,
  Search as SearchIcon,
  DarkModeOutlined,
  LightMode,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Drawer,
  Button,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// useTheme (mui)
import { useTheme } from '@mui/material/styles';

// components
import { Sidebar } from '..';

// color mode context
import { ColorModeContext } from '../../utils/ToggleColorMode';

// styling
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

export default function Navbar() {
  // hooks
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  // local variables
  const isAuth = true;
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
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{ flexGrow: 1 }}
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
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder='Search…'
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
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
                {isAuth ? (
                  <>
                    <Button
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
