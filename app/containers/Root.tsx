import * as React from 'react';
import { History } from 'history';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from '../routes';
import { Store } from 'redux';
interface IRootType {
  store: Store<any>;
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
