import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import './app.global.scss';
import { Store } from 'redux';
import { IStoreWithPersistor } from './store/IStoreWithPersistor';

const { configureStore, history } = require('./store/configureStore');
const configuredStore: IStoreWithPersistor = configureStore();
const store: Store<object | void> = configuredStore.store;

render(
  <AppContainer>
    <Root store={store} history={history} persistor={configuredStore.persistor} />
  </AppContainer>,
  document.getElementById('root'),
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
