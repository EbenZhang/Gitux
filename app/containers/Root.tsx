import * as React from 'react';
import * as Redux from 'react-redux';
import { History } from 'history';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from '../routes';
interface IRootType {
  store: Redux.Store<any>;
  history: History;
  persistor: any;
}

export default function Root({ store, history, persistor }: IRootType) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}
