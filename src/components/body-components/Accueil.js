import React from "react";
import { Link } from "react-router-dom";

const Accueil = () => {
  return (
    <div className="accueil">
      <div className="text-div">
        <h2>De bons produits à petits prix</h2>
        <div className="btn">
          <Link to="/produits">Voir les produits</Link>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
