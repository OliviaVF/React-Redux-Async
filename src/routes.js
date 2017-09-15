import React from 'react';
import { Route, Switch } from 'react-router';
import App from './containers/App';
import Post from './containers/Post';


const Routes = () => (
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/:permalink" component={Post} />
  </Switch>
)
export default Routes;
