import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";

const inistialState = {};

const store = createStore(
  rootReducer,
  inistialState,
  composeWithDevTools(applyMiddleware(reduxThunk, logger))
);

export default store;
