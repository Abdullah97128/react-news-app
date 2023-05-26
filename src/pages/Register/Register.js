import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values:", values);
    axios
      .post("http://127.0.0.1:8000/api/register", values)
      .then((response) => {
        if (response?.data?.register) {
          toast.success("Succesfull");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else if (response?.data?.message) {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setSubmitting(false);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        <div className="wrapper">
          <div className="inner">
            <Form>
              <h3>Register</h3>
              <div className="form-row">
                <div className="form-wrapper">
                  <label htmlFor="">Name *</label>
                  <Field className="input" type="text" id="name" name="name" />
                  <ErrorMessage name="name" component="div" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-wrapper">
                  <label htmlFor="">Email *</label>
                  <Field
                    className="input"
                    type="text"
                    id="email"
                    name="email"
                  />
                  <ErrorMessage name="email" component="div" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-wrapper">
                  <label htmlFor="">Password *</label>
                  <Field
                    className="input"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage name="password" component="div" />
                </div>
              </div>
              <button type="submit" data-text="Register">
                <span>Register</span>
              </button>
            </Form>
          </div>
        </div>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Register;
