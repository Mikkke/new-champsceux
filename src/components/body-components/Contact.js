import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const schema = yup.object().shape({
  name: yup
    .string()
    .max(30, "le nom doit comporter 30 caracteres maximum")
    .required("ce champs est requis"),
  mail: yup
    .string()
    .max(30, "le mail doit comporter 30 caracteres maximum")
    .required("ce champs est requis"),
  message: yup
    .string()
    .max(1000, "le champs doit etre remplis")
    .required("ce champs est requis")
});

const apiBaseUrl = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseUrl}/api/send-message`;

const Contact = () => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const onSubmit = async data => {
    try {
      const res = await axios.post(`${initialUrl}`, data);
      //console.log("res.data :>> ", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contact">
      <h1>Contact</h1>
      <div className="container-contact">
        <form className="form-div" onSubmit={handleSubmit(onSubmit)}>
          <label>Nom</label>
          <input type="text" className="name" ref={register} name="name" />
          {errors.name && errors.name.message}
          <label>Mail</label>
          <input type="email" className="mail" ref={register} name="mail" />
          {errors.mail && errors.mail.message}
          <label>Message</label>
          <textarea
            className="textarea"
            type="text"
            name="message"
            ref={register}
          />
          {errors.message && errors.message.message}
          <input type="submit" className="send" value="Envoyer" />
        </form>

        <div className="reseaux">
          <h1>Email</h1>
          <p /* href="/" */ className="mail-Link">
            <Link to="/">champsceux@champceux.com</Link>
          </p>
          <h2>Retrouvez nous sur</h2>
          <div className="social">
            <a href="/" className="insta">
              <FaInstagram size={55} />
            </a>
            <a href="/" className="facebook">
              <FaFacebookF size={55} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
