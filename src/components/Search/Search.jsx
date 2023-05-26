import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import styles from "./Search.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Search = ({ onFilter }) => {
  const [sources, setSources] = useState([]);
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ]; // as only provides 7 categories
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const handleFilter = (values, { setSubmitting, resetForm }) => {
    onFilter(values);
    setSubmitting(false);
    resetForm();
  };

  const handlePreferences = (values, { setSubmitting, resetForm }) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    axios
      .post(`http://127.0.0.1:8000/api/preferences/${user.id}`, values)
      .then((response) => {
        if (response?.data?.user) {
          toast.success("Successfull");
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error in saving Prefrences");
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };
  // sources
  useEffect(() => {
    console.log("simple Useeffect called");
    axios
      .get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey}`)
      .then((response) => {
        if (response) {
          setSources(response?.data?.sources);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Formik
        initialValues={{ keyword: "", from: "", category: "", source: "" }}
      >
        {(formikProps) => (
          <Form className={styles.form}>
            <div className={styles.search}>
              <Field
                type="text"
                className={styles.input}
                name="keyword"
                placeholder="Enter keywords"
              />
            </div>
            <div className={styles.filtersMain}>
              <div className={styles.filters}>
                <Field type="date" className={styles.filter} name="from" />
                <Field as="select" className={styles.filter} name="category">
                  <option value="">Category</option>
                  {categories?.map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                </Field>
                <Field as="select" className={styles.filter} name="source">
                  <option value="">Source</option>
                  {sources?.map((val) => (
                    <option value={val.id} key={val.name}>
                      {val.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <div className={styles.filterBtns}>
              <button
                type="button"
                onClick={() => {
                  handleFilter(formikProps.values, formikProps);
                }}
              >
                Filter
              </button>
              <button
                type="button"
                className={styles.prefBtn}
                onClick={() => {
                  handlePreferences(formikProps.values, formikProps);
                }}
              >
                Save Preferences
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default Search;
