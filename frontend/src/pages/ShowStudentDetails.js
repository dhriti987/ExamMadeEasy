import React, { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
import styles from "../styles/ShowStudentDetails.module.scss";
import profileImg from "../assets/profileImg.jpg";
import { useParams } from "react-router-dom";
import api from "../api/ProtectedApi";

function ShowStudentDetails() {
  let { stdId } = useParams();
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`users/student/${stdId}`);
      setStudentDetails({
        ...res.data,
      });
    };
    fetch();
  }, []);

  return (
    <LayOut>
      <div className={styles.ShowStudentDetailsContainer}>
        <h1 style={{ padding: "1.6rem 0", textAlign: "center" }}>
          Student Details
        </h1>
        {studentDetails && (
          <div className={styles.studentDetailsContainer}>
            <div className={styles.studentImage}>
              <img src={profileImg} alt="" />
            </div>
            <div className={styles.studentDetails}>
              <div className={styles.studentDetail}>
                <h3 className={styles.studentDetailsHeading}>Name:</h3>
                <h3 className={styles.studentDetailsContent}>
                  {studentDetails.name}
                </h3>
              </div>
              <div className={styles.studentDetail}>
                <h3 className={styles.studentDetailsHeading}>
                  Registration No.:
                </h3>
                <h3 className={styles.studentDetailsContent}>
                  {studentDetails.registration_number}
                </h3>
              </div>
              <div className={styles.studentDetail}>
                <h3 className={styles.studentDetailsHeading}>Email:</h3>
                <h3 className={styles.studentDetailsContent}>
                  {studentDetails.email}
                </h3>
              </div>
              <div className={styles.studentDetail}>
                <h3 className={styles.studentDetailsHeading}>DOB:</h3>
                <h3 className={styles.studentDetailsContent}>
                  {studentDetails.dob}
                </h3>
              </div>
              <div className={styles.studentDetail}>
                <h3 className={styles.studentDetailsHeading}>Class:</h3>
                <h3 className={styles.studentDetailsContent}>
                  {studentDetails.st_class}
                </h3>
              </div>
              <div className={styles.studentDetail}>
                <h3 className={styles.studentDetailsHeading}>Father's Name:</h3>
                <h3 className={styles.studentDetailsContent}>
                  {studentDetails.father_name}
                </h3>
              </div>
              <div className={styles.studentDetail}>
                <h3 className={styles.studentDetailsHeading}>Mother's Name:</h3>
                <h3 className={styles.studentDetailsContent}>
                  {studentDetails.mother_name}
                </h3>
              </div>
              <div className={styles.studentDetail}>
                <h3 className={styles.studentDetailsHeading}>Address:</h3>
                <h3 className={styles.studentDetailsContent}>
                  {studentDetails.address}
                </h3>
              </div>
              <div className={styles.studentDetail}>
                <h3 className={styles.studentDetailsHeading}>Nationality:</h3>
                <h3 className={styles.studentDetailsContent}>
                  {studentDetails.nationality}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayOut>
  );
}

export default ShowStudentDetails;
