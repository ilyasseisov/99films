// mui
import { Grid, CssBaseline } from '@mui/material';

// components
import { Navbar, Sidebar, Router } from './';

//
export default function App() {
  //
  // hooks
  // local variables

  //
  return (
    <>
      <CssBaseline />

      <Grid container spacing={2}>
        <Grid bgcolor='aqua' item xs={12}>
          <Navbar />
        </Grid>
        <Grid
          bgcolor='blueviolet'
          item
          md={3}
          xl={2}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Sidebar />
        </Grid>
        <Grid item xs={9} xl={10}>
          <Router />
        </Grid>
      </Grid>
    </>
  );
}
