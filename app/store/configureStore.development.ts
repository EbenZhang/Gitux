import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, push } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

import * as counterActions from '../actions/counter';
import createElectronStorage from "redux-persist-electron-storage";
import { persistStore, persistReducer } from 'redux-persist';
import { IStoreWithPersistor } from './IStoreWithPersistor';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  },
};

const actionCreators = Object.assign({}, 
  counterActions,
  {push}
);

const logger = (<any>createLogger)({
  level: 'info',
  collapsed: true,
});

const history = createHashHistory();
const router = routerMiddleware(history);

const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) as any :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger),
);

export = {
  history,
  configureStore(initialState: object | void): IStoreWithPersistor {
    const store = createStore(persistedReducer, initialState, enhancer);
    const persistor = persistStore(store);
    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').default),
      );
    }

    return { store, persistor };
  },
};
