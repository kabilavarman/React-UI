import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import {
  DEFAULT_STATE,
  DEFAULT_STATE_FF_EF,
  PENDING,
  FULFILLED,
  REJECTED,
  GRID,
  LOGIN
  
} from "../utility/constants";

const createReducer = (reducerName, defaultStateParam) => {
  const defaultState = defaultStateParam || DEFAULT_STATE;
  return (state = defaultState, action) => {
    switch (action.type) {
      case `${reducerName}_${PENDING}`:
      case `${reducerName}_${FULFILLED}`:
      case `${reducerName}_${REJECTED}`:
        return Object.assign({}, action.payload);
      default:
        return state;
    }
  };
};

const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  grid: createReducer(GRID),
  login: createReducer(LOGIN, DEFAULT_STATE_FF_EF),
  
});

export default rootReducer;
