import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useSpring, animated } from "react-spring";

const CollapseMenu = props => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200]
            })
            .interpolate(openValue => `translate3d(0, ${openValue}px, 0`)
        }}
      >
        <NavLinks>
          <li>
            <Link to="/" onClick={props.handleNavbar}>
              ACCUEIL
            </Link>
          </li>
          <li>
            <Link to="/produits" onClick={props.handleNavbar}>
              PRODUITS
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={props.handleNavbar}>
              CONTACT
            </Link>
          </li>
          <li>
            <Link to="/historique" /*"/signup"*/ onClick={props.handleNavbar}>
              COMPTE
            </Link>
          </li>
          {/*           <li>
            <Link to="/panier" onClick={props.handleNavbar}>
              Panier
            </Link>
          </li>
          <li>
            <Link to="/signup" onClick={props.handleNavbar}>
              SignUp
            </Link>
          </li> */}
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: white;
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  z-index: 4;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;

  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: black;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }
  }
`;
