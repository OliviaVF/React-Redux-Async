import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import AppRoutes from './routes.js';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>,
  document.getElementById('root')
)
