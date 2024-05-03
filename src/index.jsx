// react
import ReactDOM from 'react-dom/client';
// styles
import '../css/index.css';
// components
import App from './components/App';
// router
import { BrowserRouter } from 'react-router-dom';
// mui
import { ThemeProvider } from '@mui/material';
// custom theme for mui
import { customTheme } from './customTheme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
