/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { firebase, refStorage } from "../../firebase/Firebase";
import NavCompte from "../compte-components/NavCompte";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const schema = yup.object().shape({
  name: yup
    .string()
    .max(30, "le nom doit comporter 30 caracteres max")
    .required("ce champs est requis"),
  price: yup
    .number()
    .required()
    .positive()
    .required("ce champs est requis"),
  description: yup.string().required("ce champs est requis")
});

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/produits`;

const ProduitsCompte = props => {
  //console.log("props du produit compte :>> ", props);
  //console.log("currentUser du produit compte :>> ");

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });
  const [succesMessage, setSuccesMessage] = useState([]);

  const succes = succesMessage ? (
    <h2 className="succes-header">{succesMessage.message}</h2>
  ) : (
    ""
  );
  //console.log("succesMessage :>> ", succesMessage);
  const onSubmit = async data => {
    /*     console.log("data :>> ", data);
    const formData = new FormData();
    formData.append("photo", data.photo);
 */
    console.log("data je cherche ta valeur", data.photo[0], "data");
    const refStorage = firebase.storage().ref("image" + data.photo[0].name);
    let upload = refStorage.put(data.photo[0]);

    upload.on(
      "state_changed",
      snapshot => {},
      error => {},
      async () => {
        const url = await upload.snapshot.ref.getDownloadURL();
        //console.log("url :>> ", url);
        data.photo = url;
        try {
          const res = await axios.post(`${initialUrl}`, data);
          //console.log("res :>> ", res);
          //console.log("data ici bas", res.data);
          setSuccesMessage(res.data);
        } catch (error) {
          console.error(error);
        }
        // return url;
      }
    );
  };

  const isAuth = localStorage.getItem("auth");
  //console.log("isAuth de produit :>> ", isAuth);
  if (!isAuth) {
    return <Redirect to="/compte" />;
  }

  return (
    <div className="compte-div">
      <h1>Ajouter produit</h1>
      {succes}
      <div className="compte-produit-div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input ref={register} name="name" type="text" placeholder="Nom..." />
          {<span>{errors.name && errors.name.message}</span>}
          <input
            ref={register}
            name="price"
            type="number"
            placeholder="Prix..."
          />
          {errors.price && errors.price.message}
          <label>type </label>
          <select name="type" form="carform" className="select" ref={register}>
            <option>Fruit</option>
            <option>Legume</option>
            <option>Produit laitier</option>
            <option>Viande</option>
            <option>Autre</option>
          </select>
          {errors.type && errors.type.message}
          <label>Photo</label>
          <input ref={register} name="photo" type="file" placeholder="photo" />
          {errors.photo && errors.photo.message}
          <textarea
            ref={register}
            name="description"
            placeholder="description"
          />
          <button type="submit" value="ajouter a la liste">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(ProduitsCompte);
