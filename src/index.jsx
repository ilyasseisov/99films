// react
import ReactDOM from 'react-dom/client';
// styles
import '../css/index.css';
// components
import App from './components/App';
// router
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
