import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post("http://127.0.0.1:8000/api/login", values)
      .then((response) => {
        if (response?.data?.user) {
          toast.success("Successful");
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          sessionStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.access_token)
          );

          setTimeout(() => {
            navigate("/home");
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
              <h3>Login</h3>
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
              <button type="submit" data-text="Login">
                <span>Login</span>
              </button>
            </Form>
          </div>
        </div>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Login;
