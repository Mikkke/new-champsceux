import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import Logo from "./Logo";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { clearCurrentUser } from "../../actions/authAction";

const Nav = props => {
  const currentName = props.currentUser ? (
    <h4>Bonjour {props.currentUser.name}</h4>
  ) : null;

  //console.log("props direct du navbar", props);
  const barAnimation = useSpring({
    from: { transform: "translate3d(0, -10rem, 0)" },
    transform: "translate3d(0, 0, 0)"
  });

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly
  });
  /* 
  const [userSession, setUserSession] = useState(null);

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
      user ? setUserSession(user) : props.history.push("/");
    });

    return () => {
      listenner();
    };
  }, []); */
  const liensVersCompte =
    props.currentUser && props.currentUser ? (
      <Link to="/historique">COMPTE</Link>
    ) : (
      <Link to="/compte">COMPTE</Link>
    );
  useEffect(() => {
    /* getNumbers(); */
  });
  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Logo />
          {currentName}
          <NavLinks style={linkAnimation}>
            <Link to="/">ACCUEIL</Link>
            <Link to="/produits">PRODUITS</Link>
            <Link to="/contact">CONTACT</Link>
            {liensVersCompte}
            {/* {props.currentUser && props.currentUser ? (
              <form
                style={{ display: "inline" }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="submit"
                  name="logout"
                  value="deconnexion"
                  ref={register}
                />
              </form>
            ) : null} */}
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </>
  );
};

const mapStateToProps = state => ({
  /* cardProps: state.cardState, */
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  clearCurrentUser: logout => dispatch(clearCurrentUser(logout))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
  z-index: 1;
  font-size: 1rem;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  height: 4rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: black;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
    }

    @media (max-width: 888px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 889px) {
    display: none;
  }
`;
