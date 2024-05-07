// react
import { useState } from 'react';
// mui
import {
  Menu,
  Search as SearchIcon,
  DarkMode,
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
  Avatar,
  Drawer,
  Button,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// useTheme (mui)
import { useTheme } from '@mui/material/styles';

// components
import { Sidebar } from '..';

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
          elevation='0'
          sx={{ padding: { xs: '8px 0px 20px 0px', md: '8px 0px 8px 0px' } }}
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
                        color: `${theme.palette.white.main}`,
                        borderColor: `${theme.palette.white.main}`,
                      }}
                      variant='outlined'
                    >
                      Account
                    </Button>
                    <Avatar
                      alt='user'
                      src='https://mui.com/static/images/avatar/2.jpg'
                      sx={{
                        marginLeft: '12px',
                        display: { xs: 'none', sm: 'block' },
                      }}
                    />
                  </>
                ) : (
                  <Button
                    sx={{
                      color: `${theme.palette.white.main}`,
                      borderColor: `${theme.palette.white.main}`,
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
                >
                  <LightMode />
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
