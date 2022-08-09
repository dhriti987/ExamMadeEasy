import React from "react";
import styles from "../styles/SuccessMsg.module.scss";
import successImg from "../assets/correct.png";

function SuccessMsg({ msg, show }) {
  return (
    <div
      className={styles.msgContainer}
      style={show ? { top: "10px" } : { top: "-160px" }}
    >
      <div className={styles.successImg}>
        <img src={successImg} alt="" />
      </div>
      <h2>{msg}</h2>
    </div>
  );
}

export default SuccessMsg;
