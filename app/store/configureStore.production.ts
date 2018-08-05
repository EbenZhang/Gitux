import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import createElectronStorage from "redux-persist-electron-storage";
import { persistReducer, persistStore } from 'redux-persist';
import { IStoreWithPersistor } from './IStoreWithPersistor';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);
const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export = {
  history,
  configureStore(initialState: object | void): IStoreWithPersistor {
    const store = createStore(persistedReducer, initialState, enhancer);
    const persistor = persistStore(store);
    return { store, persistor };
  },
};
