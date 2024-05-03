import { createTheme } from '@mui/material';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#E50914',
    },
    redDark: {
      main: '#B20710',
      contrastText: '#fff',
    },
    dark: {
      main: '#101010',
      contrastText: '#fff',
    },
    white: {
      main: '#FFFFFF',
    },
  },
});
