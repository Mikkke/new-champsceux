import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearCurrentUser } from "../../actions/authAction";
import axios from "axios";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/profil/sign-out`;

const NavCompte = props => {
  //console.log("props de navcompte :>> ", props);
  //console.log("props  nav co:>> ", props);
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    try {
      const res = await axios.post(`${initialUrl}`, data);

      //console.log("res :>> ", res);
      //onsole.log("res.data :>> ", res.data);
      props.clearCurrentUser(res.data);
      localStorage.clear();
    } catch (error) {
      console.log("error.response :>> ", error.response);
    }
  };

  const isAuth = localStorage.getItem("auth");
  //console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }

  /* const displayName = props.currentUser && (
    <h2>bonjour {props.currentUser.name}</h2>
  ); */

  const vendeur = () => {
    if (props.currentUser) {
      if (props.currentUser.sellerId) {
        //console.log("je vend");
        return <Link to="/produitscompte">Produit</Link>;
      }
      if (props.currentUser.buyerId) {
        //console.log("j'achete");

        return <Link to="/achat">Mes achats</Link>;
      }
      //console.log("props.currentUser.id :>> ");
    }
  };

  return (
    <div className="navCompte">
      <aside>
        <nav>
          {vendeur()}
          <Link to="/moncompte">Compte</Link>
          <Link to="/historique">Historique</Link>
        </nav>
        {props.currentUser && props.currentUser ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="submit"
              name="logout"
              value="déconnexion"
              ref={register}
            />
          </form>
        ) : null}
      </aside>
      {/* {displayName} */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};
const mapDispatchToProps = dispatch => ({
  clearCurrentUser: logout => dispatch(clearCurrentUser(logout))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavCompte)
);
