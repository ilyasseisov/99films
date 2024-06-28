// mui
import { ThemeProvider, createTheme } from '@mui/material';
// react hooks
import { createContext, useMemo, useState } from 'react';

//
export const ColorModeContext = createContext();

export default function ToggleColorMode({ children }) {
  // hooks
  const [mode, setMode] = useState('light');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#E50914',
            dark: '#B20710',
          },
          dark: {
            main: '#292929',
            dark: '#000000',
          },
          light: {
            main: '#FFFFFF',
          },
        },

        //
        typography: {
          fontFamily: [
            'Plus Jakarta Sans',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
        },
        //
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1800,
            xxxl: 1920,
          },
        },
        //
      }),
    [mode]
  );
  // local variables
  // functions
  function toggleColorMode() {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }
  // return
  return (
    <>
      <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
