import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {fetchUser, fetchProducts} from '../actions';
import "../styles/_index.scss"
import "bootstrap/scss/bootstrap.scss"
import 'react-toastify/dist/ReactToastify.css';

const composeEnhancers = typeof window === 'object' && typeof window === 'object' &&
(window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
(window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(
  rootReducer, 
  {},
  composeEnhancers(
    applyMiddleware(thunk))
  );

store.dispatch(fetchUser());
store.dispatch(fetchProducts());

export default ({ element }) => (
  <Provider store={store}>
    <>
      {element}
    </>
  </Provider>
);