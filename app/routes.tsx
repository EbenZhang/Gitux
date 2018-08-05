import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Home from './home/Home';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </App>
);
