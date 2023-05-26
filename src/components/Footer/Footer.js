import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <h3>News Aggregator</h3>
          <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
        <div className={styles.footerBottom}>
          <p>
            copyright &copy; <a href="#">News Aggregator</a>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
