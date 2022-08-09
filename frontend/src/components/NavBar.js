import React from "react";
import styles from "../styles/Navbar.module.scss";
import { AiOutlineHome, AiOutlineQrcode } from "react-icons/ai";
import { RiNewspaperLine } from "react-icons/ri";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className={styles.NavbarContainer}>
      <h2 className={styles.NavbarContainerHeading}> Exam's Simplified </h2>
      <div className={styles.NavbarContents}>
        <Link to={"/"} className={styles.NavbarContent}>
          <AiOutlineHome size={25} color="#b40000" />
          <p style={{ color: "#b40000" }}>DASHBOARD</p>
        </Link>
        <Link to={"/create-exam"} className={styles.NavbarContent}>
          <RiNewspaperLine size={25} color="aliceblue" />
          <p>CREATE EXAM</p>
        </Link>
        <Link to={"/create-supplementary"} className={styles.NavbarContent}>
          <AiOutlineQrcode size={25} color="aliceblue" />
          <p>CREATE SUPPLY</p>
        </Link>
        <Link to={"/check-student-details"} className={styles.NavbarContent}>
          <BsFillPersonCheckFill size={25} color="aliceblue" />
          <p>STUDENT DETAILS</p>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
