// index.js

import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import user from './UserReducer';
import products from './ProductsReducer';

export default combineReducers({
    user,
    products,
    toastr: toastrReducer
});