import React, { useState } from "react";
import LayOut from "../components/LayOut";
import commonStyles from "../styles/Common.module.scss";
import { useParams } from "react-router-dom";
import api from "../api/ProtectedApi";
import SuccessMsg from "../components/SuccessMsg";

function AddPerson() {
  const { person } = useParams();
  const isStudent = person === "student" ? true : false;
  const [personDetail, setPersonDetail] = useState({
    registration_number: "",
    name: "",
    st_class: null,
    email: "",
    gender: "",
    dob: "",
    father_name: "",
    mother_name: "",
    address: "",
    nationality: "",
  });
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `users/${isStudent ? "student" : "professor"}/`,
        personDetail
      );
      setPersonDetail({
        registration_number: "",
        name: "",
        st_class: null,
        email: "",
        gender: "",
        dob: "",
        father_name: "",
        mother_name: "",
        address: "",
        nationality: "",
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, [3000]);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <LayOut>
      {
        <SuccessMsg
          msg={`Succefully created ${
            isStudent ? "Student" : "Teacher"
          } profile`}
          show={success}
        />
      }
      <div className={commonStyles.container}>
        <h1
          style={{
            padding: "0.5rem 0",
            textAlign: "center",
            marginBottom: "0",
          }}
        >
          Add {isStudent ? "Student" : "Teacher"}
        </h1>
        <form className={commonStyles.fillForm} onSubmit={onSubmit}>
          {isStudent && (
            <input
              type="text"
              placeholder="Registration Number"
              required
              onChange={(e) => {
                setPersonDetail({
                  ...personDetail,
                  registration_number: e.target.value,
                });
              }}
              value={personDetail.registration_number}
            />
          )}
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => {
              setPersonDetail({
                ...personDetail,
                name: e.target.value,
              });
            }}
            value={personDetail.name}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setPersonDetail({
                ...personDetail,
                email: e.target.value,
              });
            }}
            value={personDetail.email}
          />
          {isStudent && (
            <input
              type="number"
              placeholder="Class"
              required
              onChange={(e) => {
                setPersonDetail({
                  ...personDetail,
                  st_class: e.target.value,
                });
              }}
              value={personDetail.st_class}
            />
          )}
          <select
            name="gender"
            onChange={(e) => {
              setPersonDetail({
                ...personDetail,
                gender: e.target.value,
              });
            }}
            defaultValue={"none"}
          >
            <option value="none" selected>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
          <input
            type="date"
            placeholder="Date Of Birth"
            required
            onChange={(e) => {
              setPersonDetail({
                ...personDetail,
                dob: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder="Father's Name"
            required
            onChange={(e) => {
              setPersonDetail({
                ...personDetail,
                father_name: e.target.value,
              });
            }}
            value={personDetail.father_name}
          />
          <input
            type="text"
            placeholder="Mother's Name"
            required
            onChange={(e) => {
              setPersonDetail({
                ...personDetail,
                mother_name: e.target.value,
              });
            }}
            value={personDetail.mother_name}
          />
          <input
            type="text"
            placeholder="Address"
            required
            onChange={(e) => {
              setPersonDetail({
                ...personDetail,
                address: e.target.value,
              });
            }}
            value={personDetail.address}
          />
          <input
            type="text"
            placeholder="Nationality"
            required
            onChange={(e) => {
              setPersonDetail({
                ...personDetail,
                nationality: e.target.value,
              });
            }}
            value={personDetail.nationality}
          />
          <button className={commonStyles.formBtn} type="submit">
            <h3>Add</h3>
          </button>
        </form>
      </div>
    </LayOut>
  );
}

export default AddPerson;
