import React, { useEffect } from "react";
//import { useForm } from "react-hook-form";
//import * as yup from "yup";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebase, fireAuth } from "../../firebase/Firebase";
import axios from "axios";
/* import { checkToken } from "../../actions/checkToken";
import { connect } from "react-redux"; */

const firebaseAppAuth = fireAuth;
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};
/* const schema = yup.object().shape({
  nom: yup
    .string()
    .max(30, "le nom dois compter 30 caracteres maximum")
    .required("ce champs est requis")
});*/

const SignUp = ({ user, signInWithGoogle, signOut, checkToken }) => {
  async function callApi() {
    await axios.get("http://localhost:8000/api/auth");
  }

  useEffect(() => {
    if (user) {
      user
        .getIdToken()
        .then(idToken => {
          console.log("idToken", idToken);
          axios.defaults.headers.common["Authorization"] = idToken;
        })
        .catch(err => console.log(err));
    }
    checkToken();
  }, [user]);
  /* React.useEffect(() => {
    checkToken();
    console.log("le token ");
    console.log(user, "user");
  }); */

  return (
    <div className="sign-up">
      {user ? <p>Salut, {user.displayName}</p> : <p>Login stp</p>}
      {user ? (
        <>
          <button onClick={signOut}>Déconnexion</button>
          <button onClick={() => callApi(user)}>ping Serveur</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Se login avec Google</button>
      )}
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(SignUp);
