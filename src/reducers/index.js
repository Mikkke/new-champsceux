import { combineReducers } from "redux";
import authReducer from "./authReducer";
import produitsReducer from "./produitsReducer";

export default combineReducers({
  auth: authReducer,
  produit: produitsReducer
});
