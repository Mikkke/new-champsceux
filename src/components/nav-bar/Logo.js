import React from "react";
import logo from "../../assets/logo.jpg";
import styled from "styled-components";

const Logo = () => {
  return <Image src={logo} alt="le logo" />;
};

export default Logo;

const Image = styled.img`
  height: 85%;
  margin: 0 0;
  cursor: pointer;
`;
