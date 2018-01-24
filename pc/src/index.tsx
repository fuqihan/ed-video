import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import RouterView from './router/mainRouter';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RouterView />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();