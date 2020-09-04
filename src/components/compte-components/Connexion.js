import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/authAction";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("ce champs est requis"),
  password: yup
    .string()
    .min(6, "doit contenir plus de 6 caracteres")
    .required("ce champs est requis")
});

const apiBaseUrl = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseUrl}/api/profil/login`;

// eslint-disable-next-line react/prop-types
const Connexion = props => {
  const [error, setError] = useState("");
  //console.log("props de connexion sur le bitin :>> ", props);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const onSubmit = async data => {
    try {
      const res = await axios.post(`${initialUrl}`, data);
      //console.log("res :>> ", res);
      //const auth = res.data.isAuthenticated;
      localStorage.setItem("auth", JSON.stringify(res.data));
      // eslint-disable-next-line react/prop-types
      props.setCurrentUser(res.data);
      // eslint-disable-next-line react/prop-types
      props.history.push("/moncompte");
      //localStorage.setItem("user", JSON.stringify(res.data));
      // eslint-disable-next-line react/prop-types
    } catch (error) {
      //console.log("error.message :>> ");
      setError(error.response.data.message);
    }
  };

  /* const friends = ["jhon", "peter", "fred"];
  localStorage.setItem("friends", JSON.stringify(friends));
  const values = JSON.parse(localStorage.getItem("friends"));
  console.log("values[1] :>> ", values[1]); */

  return (
    <div className="connexion-div">
      <div className="wrap">
        {<span>{error}</span>}
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email.."
            name="email"
            ref={register}
          />
          {errors.email && errors.email.message}

          <input
            name="password"
            type="password"
            placeholder="Mot de passe.."
            ref={register}
          />
          {errors.password && errors.password.message}
          <button type="submit">Connexion</button>
        </form>
        <p>
          Pas encore de compte ? <Link to="/inscription">inscrivez-vous</Link>{" "}
        </p>
        <p>
          <Link to="/forget-password">Mot de passe oublié ?</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Connexion)
);
