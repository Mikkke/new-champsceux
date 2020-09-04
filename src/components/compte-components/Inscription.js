import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "ce champs prend au minimum 4 caracteres")
    .max(20, "ce champs ne doit pas depasser 20 caracteres")
    .required("ce champs est requis"),
  email: yup
    .string()
    .email()
    .required("ce champs est requis"),
  /*   address: yup
    .string()
    .min(10)
    .required("ce champs est requis"), */
  password: yup
    .string()
    .min(6, "doit contenir plus de 6 caracteres")
    .required("ce champs est requis"),
  city: yup
    .string()
    .min(3)
    .required("ce champs est requis"),
  postalCode: yup
    .string()
    .max(5, "code postal non valide")
    .min(5, "code postal non valide")
    .required("ce champs est requis"),
  phoneNumber: yup
    .string()
    .max(10, "maximum 10 caracteres")
    .min(10, "minimum 10 caracteres")
    .required("ce champs est requis")
});

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/profil/register`;

// eslint-disable-next-line react/prop-types
const Inscription = ({ history }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  /* s */
  /*   const [adress, setAdress] = useState(""); */

  const onSubmit = async data => {
    // console.log("data :>> ", data);
    if (password === confirmPassword) {
      try {
        const res = await axios.post(`${initialUrl}`, data);
        //console.log("res.data.response :>> ", res.data.message);
        // eslint-disable-next-line react/prop-types
        history.push("/compte");
      } catch (error) {
        //console.log("error :>> ", error.response.data.message);
        setError(error.response.data.message);
      }
    } else {
      alert("les mot de passe ne correspondent pas");
    }
  };

  /*   const addressInput =
    profilType === "seller" ? (
      <div>
        <input
          type="text"
          id="password"
          required
          value={adress}
          onChange={e => setAdress(e.target.value)}
          placeholder="Adresse.."
          name="adress"
          ref={register}
        />
        {errors.adress && errors.adress.message}
      </div>
    ) : null; */

  return (
    <div className="inscription-div">
      <div className="wrap-inscription">
        <h2>Inscription</h2>
        {<span className="span-error">{error}</span>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="pseudo"
            placeholder="Nom..."
            required
            name="name"
            ref={register}
          />
          {errors.name && errors.name.message}

          <input
            type="email"
            id="email"
            placeholder="Email..."
            required
            name="email"
            ref={register}
          />
          {errors.email && errors.email.message}

          {/* <div className="inputBox">
            <label>Je suis</label>
            <select
              name="profilType"
              form="carform"
              className="select"
              defaultValue="seller"
              ref={register}
            >
              <option value="seller">Agriculteur</option>
            </select>
          </div> */}
          {/* {addressInput} */}
          <input
            name="profilType"
            type="hidden"
            ref={register}
            defaultValue="seller"
          />
          <input
            name="city"
            type="text"
            ref={register}
            placeholder="Ville..."
            required
          />
          {errors.city && errors.city.message}
          <input
            name="postalCode"
            type="text"
            ref={register}
            placeholder="Code postal..."
            required
          />
          {errors.postalCode && errors.postalCode.message}
          <input
            name="phoneNumber"
            type="text"
            ref={register}
            placeholder="Télephone..."
            required
          />
          {errors.phoneNumber && errors.phoneNumber.message}

          <input
            type="password"
            id="password"
            name="password"
            ref={register}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mot de passe..."
          />
          {errors.password && errors.password.message}

          <input
            type="password"
            id="confirmPassword"
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirmer mot de passe..."
          />
          <button type="submit">Inscrivez-vous</button>
        </form>
        <p>
          Déja un compte ? <Link to="/compte">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Inscription;
