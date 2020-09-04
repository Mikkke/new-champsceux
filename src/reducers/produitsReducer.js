import {
  FETCH_PRODUIT_REQUEST,
  FETCH_PRODUIT_SUCCES,
  FETCH_PRODUIT_FAILURE
} from "../actions/types";

const inittialState = {
  loading: true,
  produits: [],
  error: ""
};

const produitReducer = (state = inittialState, action) => {
  switch (action.type) {
    case FETCH_PRODUIT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PRODUIT_SUCCES:
      return {
        ...state,
        loading: false,
        produits: action.payload,
        error: ""
      };
    case FETCH_PRODUIT_FAILURE:
      return {
        ...state,
        loading: false,
        produits: [],
        error: action.payload
      };

    default:
      return state;
  }
};

export default produitReducer;
