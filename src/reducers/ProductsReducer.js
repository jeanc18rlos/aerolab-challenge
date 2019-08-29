import {
  FETCH_PRODUCTS,
  PRODUCTS_REQUEST_ERROR
} from '../actions/types';

export default function userReducer(state = {
  rows: [],
  error: false,
  loaded: false
}, action) {
  switch (action.type) {
    case PRODUCTS_REQUEST_ERROR:
      return {
        ...state,
        rows: [
          ...state.rows,
        ],
        ...action.payload.products,
        loaded: false
      }
    case FETCH_PRODUCTS:
      return {
        ...state,
        rows: [
          ...state.rows,
          ...action.payload.products
        ],
        loaded: true
      };
    default:
      return state;
  }
}