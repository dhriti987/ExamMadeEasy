import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayOut from "../components/LayOut";
import styles from "../styles/DashBoard.module.scss";
import { BsFillPersonFill, BsPlusSquare } from "react-icons/bs";
import { AiOutlineQrcode } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { CgDetailsMore } from "react-icons/cg";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import profileImg from "../assets/profileImg.jpg";
import { Link } from "react-router-dom";
import teacher from "../assets/teacher.png";
import invigilator from "../assets/invigilator.png";
import addPerson from "../assets/addPerson.png";
import exam from "../assets/exam.png";
import qrCode from "../assets/qrCode.png";
import examCorrection from "../assets/examCorrection.png";
import student from "../assets/student.png";
import api from "../api/ProtectedApi";

function DashBoard() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          label: (
            <a
              rel="noopener noreferrer"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </a>
          ),
          key: "0",
        },
      ]}
    />
  );

  useEffect(() => {
    const fetch = async () => {
      if (
        localStorage.getItem("isAdmin") ||
        localStorage.getItem("isTeacher")
      ) {
        const res = await api.get(
          `/users/professor/${localStorage.getItem("userId")}`
        );
        setUserDetails(res.data);
      } else {
        const res = await api.get(
          `/users/student/${localStorage.getItem("userId")}`
        );
        setUserDetails(res.data);
      }
    };
    fetch();
  }, []);
  return (
    <LayOut>
      <div className={styles.dashBoardContainer}>
        <div className={styles.dashBoardHead}>
          <h2>Exam Made Easy</h2>
          <div className={styles.dashBoardProfile}>
            <BsFillPersonFill size={23} color="black" />
            <div className={styles.dashBoardProfileDropDown}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {localStorage.getItem("isTeacher") ? "Teacher" : "Admin"}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className={styles.dashBoardContent}>
          <div className={styles.dashBoardProfileDetails}>
            <h2 className={styles.dashBoardProfileDetailsHead}>
              My Information
            </h2>
            <div className={styles.dashBoardProfileDetailsContentContainer}>
              <div className={styles.dashBoardProfileDetailsImg}>
                <img src={profileImg} alt="" />
              </div>
              {userDetails && (
                <div className={styles.dashBoardProfileDetailsContent}>
                  <div>
                    <h4>Name: </h4>
                    <h4 style={{ fontWeight: "700" }}>{userDetails.name}</h4>
                  </div>
                  <div>
                    <h4>Gender: </h4>
                    <h4 style={{ fontWeight: "700" }}>{userDetails.gender}</h4>
                  </div>
                  <div>
                    <h4>Father's Name: </h4>
                    <h4 style={{ fontWeight: "700" }}>
                      {userDetails.father_name}
                    </h4>
                  </div>
                  <div>
                    <h4>Mother's Name: </h4>
                    <h4 style={{ fontWeight: "700" }}>
                      {userDetails.mother_name}
                    </h4>
                  </div>
                  <div>
                    <h4>Date of Birth: </h4>
                    <h4 style={{ fontWeight: "700" }}>{userDetails.dob}</h4>
                  </div>
                  <div>
                    <h4>Email: </h4>
                    <h4 style={{ fontWeight: "700" }}>{userDetails.email}</h4>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.dashBoardFeatures}>
            {JSON.parse(localStorage.getItem("isAdmin")) && (
              <>
                <Link
                  to={"/add-person/student"}
                  className={styles.addToDashBoard}
                >
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={addPerson} alt="" />
                    </div>
                    <h1>Student</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Add Student</p>
                    <BsPlusSquare size={24} color="black" />
                  </div>
                </Link>
                <Link
                  to={"/add-person/teacher"}
                  className={styles.addToDashBoard}
                >
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={teacher} alt="" />
                    </div>
                    <h1>Teacher</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Add Teacher</p>
                    <BsPlusSquare size={24} color="black" />
                  </div>
                </Link>
              </>
            )}
            {JSON.parse(localStorage.getItem("isTeacher")) && (
              <>
                <Link to={"/create-exam"} className={styles.addToDashBoard}>
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={exam} alt="" />
                    </div>
                    <h1>Exam</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Create Exam</p>
                    <BsPlusSquare size={24} color="black" />
                  </div>
                </Link>
                <Link
                  to={"/create-supplementary"}
                  className={styles.addToDashBoard}
                >
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={qrCode} alt="" />
                    </div>
                    <h1>Supplementry</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Create Supply</p>
                    <BsPlusSquare size={24} color="black" />
                  </div>
                </Link>

                <Link
                  to={"/invigilator-scan"}
                  className={styles.addToDashBoard}
                >
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={invigilator} alt="" />
                    </div>
                    <h1>Invigilator</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Scan Supply</p>
                    <AiOutlineQrcode size={24} color="black" />
                  </div>
                </Link>
                <Link
                  to={"/teacher-correction"}
                  className={styles.addToDashBoard}
                >
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={examCorrection} alt="" />
                    </div>
                    <h1>Correction</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Exam Correction</p>
                    <TiTickOutline size={24} color="black" />
                  </div>
                </Link>
              </>
            )}
            {JSON.parse(localStorage.getItem("isAdmin")) && (
              <>
                <Link to={"/create-exam"} className={styles.addToDashBoard}>
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={exam} alt="" />
                    </div>
                    <h1>Exam</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Create Exam</p>
                    <BsPlusSquare size={24} color="black" />
                  </div>
                </Link>
                <Link
                  to={"/create-supplementary"}
                  className={styles.addToDashBoard}
                >
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={qrCode} alt="" />
                    </div>
                    <h1>Supplementry</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Create Supply</p>
                    <BsPlusSquare size={24} color="black" />
                  </div>
                </Link>

                <Link
                  to={"/invigilator-scan"}
                  className={styles.addToDashBoard}
                >
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={invigilator} alt="" />
                    </div>
                    <h1>Invigilator</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Scan Supply</p>
                    <AiOutlineQrcode size={24} color="black" />
                  </div>
                </Link>
                <Link
                  to={"/teacher-correction"}
                  className={styles.addToDashBoard}
                >
                  <div>
                    <div className={styles.addToDashBoardImg}>
                      <img src={examCorrection} alt="" />
                    </div>
                    <h1>Correction</h1>
                  </div>
                  <div className={styles.addLogo}>
                    <p>Exam Correction</p>
                    <TiTickOutline size={24} color="black" />
                  </div>
                </Link>
              </>
            )}
            <Link
              to={"/check-student-details"}
              className={styles.addToDashBoard}
            >
              <div>
                <div className={styles.addToDashBoardImg}>
                  <img src={student} alt="" />
                </div>
                <h1>Students</h1>
              </div>
              <div className={styles.addLogo}>
                <p>Student Details</p>
                <CgDetailsMore size={24} color="black" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default DashBoard;
