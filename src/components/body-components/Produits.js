import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { fetchProduit } from "../../actions/fetchProduitAction";
import Axios from "axios";
import Modal from "../modal/Modal";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const Produits = props => {
  const { fetchProduit, produitData } = props;

  useEffect(() => {
    fetchProduit();
  }, [fetchProduit]);

  const [openModal, setOpenModal] = useState(false);
  const [produitInfos, setProduitInfos] = useState({});
  const [loading, setLoading] = useState(true);

  const showModal = id => {
    setOpenModal(true);
    //console.log("id du modal :>> ", id);
    Axios.get(`${initialUrl}/${id}`)
      .then(res => {
        setProduitInfos(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };
  const closeModal = () => {
    setOpenModal(false);
    setLoading(true);
  };
  const resultInModal = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{produitInfos.name}</h2>
      </div>
      <div className="modalBody">
        <img
          className="image"
          src={
            !produitInfos.photo.includes("firebasestorage.googleapis")
              ? `${apiBaseURL}${produitInfos.photo}`
              : produitInfos.photo
          }
          alt="produit"
        />
        <div className="modelBody--container">
          <p>Prix: {produitInfos.price}€/kg</p>
          <p>type: {produitInfos.type}</p>
          <p>
            Description : <br /> {produitInfos.description}
          </p>
          <p>Ville: {produitInfos["seller.profil.city"]}</p>
          <p>Code postal: {produitInfos["seller.profil.postalCode"]}</p>
          <p>Télephone: {produitInfos["seller.profil.phoneNumber"]}</p>
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={closeModal}>
          Fermer
        </button>
      </div>
    </Fragment>
  ) : (
    <h1>Je charge</h1>
  );
  return (
    <div className="produit-div">
      {produitData.loading ? (
        <div>Loading...</div>
      ) : produitData.error ? (
        <div>Une erreur {produitData.error} </div>
      ) : (
        produitData &&
        produitData.produits.map((el, index) => {
          /* console.log("coucou mike !!!", `${apiBaseURL}${el.photo}`);
          console.log("coucou mike !!!", `${apiBaseURL}${el.photo}`); */
          const imgSrc = !el.photo.includes("firebasestorage.googleapis")
            ? `${apiBaseURL}${el.photo}`
            : el.photo;
          return (
            <div key={index} className="my-card">
              <div className="card">
                <img
                  className="image"
                  width="100%"
                  src={imgSrc}
                  alt="produit"
                />
                <div className="card-body">
                  <h1 className="card-title">{el.name}</h1>
                  <p>{el.price}€/kg</p>
                  <p>{el.type}</p>
                  <p>{el["seller.profil.city"]}</p>
                  <p>{el["seller.profil.postalCode"]}</p>
                  <button onClick={() => showModal(el.id)}>voir produit</button>
                </div>
              </div>
            </div>
          );
        })
      )}
      {/* {console.log("Modal :>> ", Modal)} */}
      <Modal showModal={openModal} closeModal={closeModal}>
        {resultInModal}
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    produitData: state.produit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduit: () => dispatch(fetchProduit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Produits);
