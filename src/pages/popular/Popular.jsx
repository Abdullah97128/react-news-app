import React, { useEffect, useState } from "react";
import styles from "./Popular.module.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from "../../components/heading/Heading";
import axios from "axios";
import noImage from "../../images/no-image.png";
import { toast } from "react-toastify";

const Popular = ({ filterValues }) => {
  console.log('filterValues Popular comp:',filterValues);
  const user = JSON.parse(sessionStorage.getItem("user"));
  // if (user && user.preferences) {
  //   filterValues = user.preferences;
  // }
  
  const apiKey = process.env.REACT_APP_NEWS_API_KEY; 
  const [popular, setPopular] = useState([]);
  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
        },
      },
    ],
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  // Default results
  useEffect(() => {
    console.log("simple Useeffect called");
    axios
      .get(
        `https://newsapi.org/v2/everything?q=Apple&apiKey=${apiKey}`
      )
      .then((response) => {
        if (response) {
          setPopular(response?.data?.articles);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Filters result
  useEffect(() => {
    console.log("Filtersssssssss Useeffect called");
    if (filterValues) {
      const searchKeyword = filterValues?.keyword || '';
      const searchSource = filterValues?.source || '';
      const searchFrom = filterValues?.from || '';
      const searchCategory = filterValues?.category || '';
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?q=${searchKeyword}&sources=${searchSource}&from=${searchFrom}&category=${searchCategory}&apiKey=${apiKey}`
        )
        .then((response) => {
          if (response) {
            setPopular(response?.data?.articles);
          }
        })
        .catch((error) => {
          console.error(error);
          toast(error?.response?.data?.message);
        });
    }
  }, [filterValues.keyword]);

  return (
    <>
      <section className={styles.popular}>
        <Heading title="Popular" />
        <div className={styles.content}>
          <Slider {...settings}>
            {popular?.map((val, index) => {
              return (
                <div key={index} className={styles.items}>
                  <div className={styles.box}>
                    <div className={styles.images}>
                      <div className={styles.img}>
                        {val.urlToImage ? (
                          <img src={val.urlToImage} alt="Article Image" />
                        ) : (
                          <img src={noImage} alt="No Image Available" />
                        )}
                      </div>
                      <div className={styles.category}>
                        <span>{val.source.name}</span>
                      </div>
                    </div>
                    <div className={styles.content}>
                      <div className={styles.text}>
                        <h1 className={styles.title}>{val?.title?.slice(0, 40)}...</h1>
                        <h5 className={styles.contentDes}>
                          {val?.content?.slice(0, 200)}...
                        </h5>
                        <div className={styles.date}>
                          <label>{formatDate(val.publishedAt)}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Popular;
