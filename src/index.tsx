import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchAllMoviesAction, fetchFavoriteMoviesAction } from './store/api-actions/api-actions.ts';
import { ErrorMessage } from './components';
import { injectStore } from './services/process-error-handle.ts';
import HistoryRouter from './components/history-route/history-route.tsx';
import browserHistory from './utils/browser-history.ts';

injectStore(store);

store.dispatch(fetchAllMoviesAction());
store.dispatch(fetchFavoriteMoviesAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
