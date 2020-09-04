import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "../modal/Modal";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { firebase } from "../../firebase/Firebase";

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;
const historiqueUrl = `${apiBaseURL}/api/historique/`;
// eslint-disable-next-line react/prop-types
const Historique = ({ currentUser }) => {
  // eslint-disable-next-line react/prop-types
  const currentId = currentUser && `${currentUser.sellerId}`;
  const [history, setHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [produitInfos, setProduitInfos] = useState({});
  const [loading, setLoading] = useState(true);

  ///updated data send
  //let fileInput = React.createRef();
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [photoProduct, setPhotoProduct] = useState("");
  const [typeProduct, setTypeProduct] = useState("");

  let data = {
    name: nameProduct,
    price: priceProduct,
    description: descriptionProduct,
    photo: "",
    type: typeProduct
  };

  const [updateData, setUpdateData] = useState(data);
  const [succesMessage, setSuccesMessage] = useState("");
  const succes = succesMessage ? (
    <h2 className="succes-header">{succesMessage}</h2>
  ) : (
    ""
  );
  console.log("succesMessage :>> ", succesMessage);
  console.log("updateData :>> ", updateData);
  const handleChange = e => {
    setUpdateData({
      ...updateData,
      [e.target.id]: e.target.value
    });
  };

  const handleOnUploadFile = e => {
    console.log("e.target.files[0] :>> ", e.target.files);
    setUpdateData({ ...updateData, photo: e.target.files });
  };

  const { name, price, description, photo, type } = updateData;
  const handleSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    axios.get(`${historiqueUrl}${currentId}`).then(res => {
      // console.log("res.data :>> ", res.data);
      setHistory(res.data);
    });
  }, [currentId]);

  const showModal = async id => {
    console.log("updateData au debut du show:>> ", updateData);
    // console.log("id du modal :>> ", id);
    await axios
      .get(`${initialUrl}/${id}`)
      .then(res => {
        //console.log("res.data id du showmodal :>> ", res.data.id);
        setUpdateData(res.data);
        setSuccesMessage("");
        /* setUpdateData(...updateData, { photo: null }); */
        setProduitInfos(res.data);
        setLoading(false);
        setNameProduct(res.data.name);
        setPriceProduct(res.data.price);
        setDescriptionProduct(res.data.description);
        setTypeProduct(res.data.type);
        /*  setPhotoProduct(res.data.photo); */
        setOpenModal(true);
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
        {/* {console.log("nameProduct  du showmodal>> ", nameProduct)}
        {console.log("data du showmodal >> ", data)} */}
      </div>
      <div className="modalBody">
        <div className="modal-body--container">
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
            <p>{produitInfos.price}€</p>
            <p>{produitInfos.description}</p>

            {/* <p>{produitInfos.createdAt}</p> */}
          </div>
        </div>

        <form className="form-history--product" onSubmit={handleSubmit}>
          {succes}
          <input
            placeholder="Nom"
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <input
            placeholder="Prix"
            name="price"
            id="price"
            type="number"
            onChange={handleChange}
            value={price}
          />
          <input
            placeholder="type"
            name="type"
            id="type"
            type="text"
            onChange={handleChange}
            value={type}
          />
          <input
            placeholder="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleOnUploadFile}
          />
          <textarea
            placeholder="descriptioon"
            name="description"
            id="description"
            type="text"
            onChange={handleChange}
            value={description}
          />
        </form>
      </div>
      <div className="modalFooter">
        <FaTimes size={28} className="modalBtn __red" onClick={closeModal} />
        <FaCheck
          className="modalBtn __green"
          size={28}
          onClick={() => updateProduct(produitInfos.id, updateData)}
        />
      </div>
    </Fragment>
  ) : (
    <h1>Je charge</h1>
  );
  const deleteProduct = async id => {
    await axios
      .delete(`${initialUrl}/${id}`)
      /* .then(res => {
        //console.log(res.data);
      }) */
      .catch(error => {
        console.log("error :>> ", error);
      });
    window.location.reload(false);
  };
  const updateProduct = async (id, data) => {
    if (!data.photo[0]) {
      console.log("data.photo dans le if update :>> ", data.photo[0]);
      let refStorage = firebase
        .storage()
        .ref()
        .child("image" + data.photo[0].name);

      let upload = refStorage.put(data.photo[0]);

      console.log("data du update :>> ", data);

      upload.on(
        "state_changed",
        snapshot => {},
        error => {},
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          console.log("url :>> ", url);
          data.photo = url;
          try {
            const res = await axios.put(`${initialUrl}/${id}`, data);
            console.log("res :>> ", res);
            console.log("data ici bas", res.data);
          } catch (error) {
            console.error(error);
          }
          // return url;
        }
      );
    } else {
      try {
        const res = await axios.put(`${initialUrl}/${id}`, data);
        console.log("res :>> ", res);
        console.log("data ici bas", res.data);
        setSuccesMessage(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    //window.location.reload(false);
  };

  const isAuth = localStorage.getItem("auth");
  //console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }
  return (
    <div className="compte-historique">
      <h3>Retrouver vos produits</h3>
      <div className="compte-historique--container">
        {history.length === 0 ? (
          <p>Vous navez rien mis en ligne encore</p>
        ) : (
          history.map((el, index) => {
            return (
              <div className="history-card" key={index}>
                <div className="card">
                  <img src={el.product.photo} alt="produit" />
                </div>

                <div className="card-body">
                  <p>{el.product.name}</p>
                  <p>{el.date}</p>
                  <p>{el.product.price}€</p>
                </div>
                <div className="history-button--container">
                  <MdDelete
                    className="bin"
                    size={25}
                    onClick={() => deleteProduct(el.product.id)}
                  />
                  <FaEdit
                    className="edit"
                    size={25}
                    onClick={() => showModal(el.product.id)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
      <Modal showModal={openModal} closeModal={closeModal}>
        {resultInModal}
      </Modal>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    produitData: state.produit
  };
};

export default connect(mapStateToProps)(Historique);

/*  console.log("data.photo[0] :>> ", data.photo);
    if (!data.photo[0]) {
      let refStorage = firebase.storage().ref("image" + data.photo[0].name);

      let upload = refStorage.put(data.photo[0]);

      console.log("data du update :>> ", data);

      upload.on(
        "state_changed",
        snapshot => {},
        error => {},
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          data.photo = url;
          try {
            const res = await axios.put(`${initialUrl}/${id}`, data);
            console.log("res :>> ", res);
            console.log("data ici bas", res.data);
          } catch (error) {
            console.error(error);
          }
          // return url;
        }
      );
    } else {
      try {
        const res = await axios.put(`${initialUrl}/${id}`, data);
        console.log("res :>> ", res);
        console.log("data ici bas", res.data);
      } catch (error) {
        console.error(error);
      }
    } */
