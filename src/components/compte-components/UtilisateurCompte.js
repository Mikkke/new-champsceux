import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Axios from "axios";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/profil/delete-profil`;

const Utilisateur = ({ currentUser, history }) => {
  const { handleSubmit, register } = useForm();
  const isAuth = localStorage.getItem("auth");
  //console.log("currentUser :>> du utilisateur ", currentUser);
  //console.log("isAuth de produit :>> ", isAuth);
  const onSubmit = async data => {
    localStorage.clear();
    try {
      const res = await Axios.post(`${initialUrl}`);
      history.push("/compte");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const currentDescription = currentUser ? (
    <div>
      <h3> Nom: {currentUser.name}</h3>
      <h3> Mail: {currentUser.email}</h3>
      <h3> Ville: {currentUser.city}</h3>
      <h3> Code postal: {currentUser.postalCode}</h3>
      <h3> Telephone: {currentUser.phoneNumber}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="submit"
          name="deletebtn"
          ref={register}
          value="supprimez compte"
        />
      </form>
    </div>
  ) : null;
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }
  return <div className="utilisateur-div">{currentDescription}</div>;
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(Utilisateur);
