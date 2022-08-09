import React from "react";
import styles from "../styles/LayOut.module.scss";
import NavBar from "./NavBar";

function LayOut({ children }) {
  return (
    <div className={styles.layOutContainer}>
      <NavBar />
      <div className={styles.childContainer}>{children}</div>
    </div>
  );
}

export default LayOut;
