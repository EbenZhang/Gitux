import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer, { IState } from '../reducers';
import createElectronStorage from "redux-persist-electron-storage";
import { persistReducer, persistStore } from 'redux-persist';
import { IStoreWithPersistor } from './IStoreWithPersistor';
import { createEpicMiddleware } from 'redux-observable';
import epics from '../epics/epics';

const epicMiddleware = createEpicMiddleware();
const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router, epicMiddleware);
const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export = {
  history,
  configureStore(initialState: IState): IStoreWithPersistor {
    const store = createStore(persistedReducer, initialState, enhancer);
    const persistor = persistStore(store);
    epicMiddleware.run(epics);
    return { store, persistor };
  },
};
