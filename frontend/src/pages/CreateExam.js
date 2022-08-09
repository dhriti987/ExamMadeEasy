import React, { useState } from "react";
import Layout from "../components/LayOut";
import commonStyles from "../styles/Common.module.scss";
import SuccessMsg from "../components/SuccessMsg";
import api from "../api/ProtectedApi";

function CreateExam() {
  const [examDetails, setExamDetails] = useState({
    name: "",
    subjext: "",
    date: "",
  });
  const [success, setSuccess] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("exam/exam/", examDetails);
      setExamDetails({
        name: "",
        subjext: "",
        date: "",
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, [3000]);
      console.log(response);
    } catch (err) {
      console.log(err.response);
      setSuccess(false);
    }
  };

  return (
    <>
      <Layout>
        {<SuccessMsg msg={`Succefully created Exam`} show={success} />}
        <div className={commonStyles.container}>
          <h1 style={{ padding: "1.6rem 0", textAlign: "center" }}>
            Create Exam
          </h1>
          <form className={commonStyles.fillForm} onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Exam Name"
              onChange={(e) => {
                setExamDetails({
                  ...examDetails,
                  name: e.target.value,
                });
              }}
              value={examDetails.name}
              required
            />
            <input
              type="date"
              placeholder="Exam Date"
              onChange={(e) => {
                setExamDetails({
                  ...examDetails,
                  date: e.target.value,
                });
              }}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              onChange={(e) => {
                setExamDetails({
                  ...examDetails,
                  subjext: e.target.value,
                });
              }}
              value={examDetails.subjext}
              required
            />
            <button className={commonStyles.formBtn} type="submit">
              <h3>Create</h3>
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}

export default CreateExam;
