import React /* , { useEffect, Fragment, useState } */ from "react";
import { Link } from "react-router-dom";
/* import { connect } from "react-redux";
import { fireAuth } from "../../firebase/Firebase";
import { setCurrentUser, clearCurrentUser } from "../../actions/auth2Action";
 */
const IndexCompte = () => {
  /*   const [userSession, setUserSession] = useState(null);

  const session =
    userSession === null ? (
      <Fragment>
        <div>Je charger</div>
      </Fragment>
    ) : (
      <div>Je ne charger pas </div>
    );

  useEffect(() => {
    let listenner = fireAuth.onAuthStateChanged(user => {
      user ? setUserSession(user) : history.push("/compte");
    });
    console.log("listenner :", listenner);

    return () => {
      listenner();
    };
  }, []); */

  /*   useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = fireAuth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        console.log("user :", user);
      } else {
        clearCurrentUser();
      }
    });

    return () => unsubscribeFromAuth();
  }, */ // [currentUser, setCurrentUser, clearCurrentUser]);

  return (
    <div className="compte-div">
      <div className="link-compte-div">
        <Link to="/inscription">Inscription</Link>
        <Link to="/connexion">Connexion</Link>
      </div>
    </div>
  );
};

/* const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearCurrentUser: () => dispatch(clearCurrentUser())
});
 */
export default /* connect(mapStateToProps, mapDispatchToProps) */ IndexCompte;
