import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("ce champs est requis")
});

const apiBaseUrl = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseUrl}/api/forget-password`;

const ForgetPassword = () => {
  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema
  });

  const onSubmit = async data => {
    try {
      const res = await axios.post(`${initialUrl}`, data);
      //console.log("res :>> ", res);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <div className="forget-password">
      <div className="wrap">
        <h2>Mot de passe oublié</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            type="text"
            ref={register}
            placeholder="Email..."
          />
          {errors.email && errors.email.message}
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
