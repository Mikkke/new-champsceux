import {
  FETCH_HISTORY_REQUEST,
  FETCH_HISTORY_SUCCES,
  FETCH_HISTORY_FAILURE
} from "./types";

import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseUrl}/api/historique/`;

export const fetchHistoryRequest = id => {
  return {
    type: FETCH_HISTORY_REQUEST,
    payload: id
  };
};

export const fetchHistorySucces = history => {
  return {
    type: FETCH_HISTORY_SUCCES,
    payload: history
  };
};
export const fetchHistoryFailure = error => {
  return {
    type: FETCH_HISTORY_FAILURE,
    payload: error
  };
};

export const fetchHistory = id => {
  return dispatch => {
    dispatch(fetchHistoryRequest(id));
    axios
      .get(initialUrl)
      .then(res => {
        const produitData = res.data;
        /* console.log("produitData :", produitData); */
        dispatch(fetchHistorySucces(produitData));
      })
      .catch(err => {
        const error = err.message;
        dispatch(fetchHistoryFailure(error));
      });
  };
};
