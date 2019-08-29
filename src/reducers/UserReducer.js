import {
  FETCH_USER,
  ADD_POINTS,
  FETCH_HISTORY,
  POST_REDEEM,
  USER_REQUEST_ERROR
} from '../actions/types';

export default function userReducer(state = {
  error: false,
  loaded: false
}, action) {
  switch (action.type) {
    case ADD_POINTS:
      return { ...state, ...action.payload.user, loaded: true };
    case POST_REDEEM:
      return {
        ...state,
        points: state.points - action.payload.user.points
        , loaded: true
      };
    case FETCH_HISTORY:
      return { ...state, ...action.payload.user, loaded: true };
    case USER_REQUEST_ERROR:
      return { ...state, ...action.payload.user, loaded: false };
    case FETCH_USER:
      return { ...state, ...action.payload.user, loaded: true };
    default:
      return state;
  }
}