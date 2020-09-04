import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "doit contenir plus de 6 caracteres")
    .required("ce champs est requis")
});

const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/forget-password/reset`;

const ResetPassword = props => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailr, setEmailr] = useState("");
  const [token, setToken] = useState("");
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  useEffect(() => {
    let email = props.match.params.email;
    let resetToken = props.match.params.token;
    setEmailr(email);
    setToken(resetToken);
    //console.log("email :>> ", email);
    //console.log("resetToken :>> ", resetToken);
  }, [props.match.params.email, props.match.params.token]);

  //console.log("props :>> ", props);
  const onSubmit = async data => {
    if (password === confirmPassword) {
      try {
        const res = await axios.post(`${initialUrl}`, data);
        //console.log("res.data :>> ", res);
        props.history.push("/compte");
      } catch (error) {
        console.log("error :>> ", error);
      }
    } else {
      alert("les mot de passes ne correspondent pas");
    }
  };
  return (
    <div className="forget-password">
      <div className="wrap">
        <h2>Nouveau mot de passe</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="password"
            type="password"
            placeholder="Mot de passe.."
            ref={register}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && errors.password.message}
          <input
            name="password"
            type="password"
            placeholder="Confirmer Mot de passe.."
            ref={register}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <input name="email" type="hidden" ref={register} value={emailr} />
          <input name="token" type="hidden" ref={register} value={token} />
          {errors.password && errors.password.message}
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
