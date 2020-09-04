import React, { useState, useEffect } from "react";
import "./App.css";
import { setCurrentUser, clearCurrentUser } from "./actions/authAction";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/nav-bar/Nav";
import Accueil from "./components/body-components/Accueil";
import Produit from "./components/body-components/Produits";
import Contact from "./components/body-components/Contact";
import Panier from "./components/body-components/Panier";
import Inscription from "./components/compte-components/Inscription";
import Connexion from "./components/compte-components/Connexion";
import NavCompte from "./components/compte-components/NavCompte";
import { connect } from "react-redux";
import RouterCompte from "./components/compte-components/RouterCompte";
import ForgetPassword from "./components/compte-components/ForgetPassword";
import ResetPassword from "./components/compte-components/ResetPassword";

const App = ({ currentUser, setCurrentUser, clearCurrentUser }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("auth");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }
  }, [setCurrentUser]);
  return (
    <>
      <Nav navbarState={navbarOpen} handleNavbar={handleNavbar} />
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/produits" component={Produit} />
        <Route path="/contact" component={Contact} />
        <Route path="/compte" component={Connexion} />
        <Route path="/panier" component={Panier} />
        <Route path="/inscription" component={Inscription} />
        <Route path="/forget-password" component={ForgetPassword} />
        <Route path="/reset-password/:email/:token" component={ResetPassword} />
        <RouterCompte />
        <Route path="/navCompte" component={NavCompte} />
        <Route path="/indexcompte" component={RouterCompte} />
      </Switch>
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearCurrentUser: () => dispatch(clearCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
