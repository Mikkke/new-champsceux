import {
  FETCH_PRODUIT_REQUEST,
  FETCH_PRODUIT_SUCCES,
  FETCH_PRODUIT_FAILURE
} from "./types";
import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseUrl}/api/produits`;

export const fetchProduitRequest = () => {
  return {
    type: FETCH_PRODUIT_REQUEST
  };
};

export const fetchProduitSucces = produits => {
  return {
    type: FETCH_PRODUIT_SUCCES,
    payload: produits
  };
};
export const fetchProduitFailure = error => {
  return {
    type: FETCH_PRODUIT_FAILURE,
    payload: error
  };
};

export const fetchProduit = () => {
  return dispatch => {
    dispatch(fetchProduitRequest());
    axios
      .get(initialUrl)
      .then(res => {
        const produitData = res.data;
        /* console.log("produitData :", produitData); */
        /* console.log(
          "produitData.[seller.profil.city] :>> ",
          produitData["produitData.seller.profil.city"]
        ); */
        dispatch(fetchProduitSucces(produitData));
      })
      .catch(err => {
        const error = err.message;
        dispatch(fetchProduitFailure(error));
      });
  };
};
