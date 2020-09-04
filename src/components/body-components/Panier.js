import React from "react";
import { connect } from "react-redux";

const Panier = props => {
  console.log("props du panier :", props);

  return (
    <div className="panier">
      <h1>Sur le Panier</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    addedItems: state.addedItems
  };
};

export default connect(mapStateToProps)(Panier);
