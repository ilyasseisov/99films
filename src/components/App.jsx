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
        <Grid item xs={12} sx={{ marginBottom: { xs: '140px', md: '64px' } }}>
          <Navbar />
        </Grid>
        <Grid
          item
          md={4}
          lg={3}
          xl={2}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={8} lg={9} xl={10}>
          <Router />
        </Grid>
      </Grid>
    </>
  );
}
