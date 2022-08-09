import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayOut from "../components/LayOut";
import styles from "../styles/CheckStudentDetails.module.scss";
import { Select } from "antd";
import student from "../assets/student.png";
import api from "../api/ProtectedApi";
const { Option } = Select;

export default function CheckStudentDetails() {
  const [studentDetailsList, setStudentDetailsList] = useState();
  const [filterStudentData, setFilterStudentData] = useState({
    studentName: "",
    class: "",
  });

  useEffect(() => {
    let isApiSubscribed = true;
    const fetch = async () => {
      try {
        const response = await api.get("users/student/");
        setStudentDetailsList(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetch();
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  useEffect(() => {
    let isApiSubscribed = true;
    const fetch = async () => {
      const res = await api.get(
        `users/filter-student?name=${filterStudentData.studentName}&class=${filterStudentData.class}`
      );
      setStudentDetailsList([...res.data]);
    };

    fetch();
    return () => {
      isApiSubscribed = false;
    };
  }, [filterStudentData]);

  return (
    <LayOut>
      <h1 style={{ padding: "1.6rem 0", textAlign: "center" }}>
        Student Details
      </h1>
      <div className={styles.studentDetailsContainer}>
        <div className={styles.studentDetailsFilter}>
          <h1>Filter</h1>
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) =>
              setFilterStudentData({
                ...filterStudentData,
                studentName: e.target.value,
              })
            }
            value={filterStudentData.studentName}
          />
          <Select
            defaultValue="Select Class"
            style={{ width: "100%" }}
            onChange={(val) =>
              setFilterStudentData({
                ...filterStudentData,
                class: val,
              })
            }
          >
            <Option value=""></Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
            <Option value="11">11</Option>
            <Option value="12">12</Option>
          </Select>
        </div>
        <div className={styles.studentDetailsLists}>
          {studentDetailsList &&
            studentDetailsList.map((item) => {
              return (
                <Link
                  to={`/check-student-details/${item.id}`}
                  className={styles.studentDetailsList}
                  key={item.id}
                >
                  <div className={styles.studentImg}>
                    <img src={student} alt="" />
                  </div>
                  <h2>{item.name}</h2>
                </Link>
              );
            })}
        </div>
      </div>
    </LayOut>
  );
}
