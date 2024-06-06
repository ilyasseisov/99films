// react
import ReactDOM from 'react-dom/client';
// redux
import { Provider } from 'react-redux';
// store for redux
import store from './app/store';
// styles
import '../css/index.css';
// components
import App from './components/App';
// router
import { BrowserRouter } from 'react-router-dom';
// color mode provider
import ToggleColorMode from './utils/ToggleColorMode';
//

//

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToggleColorMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorMode>
  </Provider>
);
