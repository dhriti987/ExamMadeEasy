import React, { useState, useEffect, useRef } from "react";
import LayOut from "../components/LayOut";
import styles from "../styles/InvigilatorScan.module.scss";
import { BsChevronRight } from "react-icons/bs";
import successMsgTick1 from "../assets/successTick1.gif";
import successMsgTick2 from "../assets/successTick2.gif";
import { Html5Qrcode } from "html5-qrcode";
import { Select } from "antd";
import api from "../api/ProtectedApi";
const { Option } = Select;

function InvigilatorScan() {
  // exam/student-sheet/
  const [displaySupplyScan, setDisplaySupplyScan] = useState(false);
  const [displayStudentScan, setDisplayStudentScan] = useState(false);
  const [showScanner, setShowScanner] = useState({
    suppyScanner: true,
    studentScanner: true,
  });
  const [scannedData, setScannedData] = useState({
    studentData: "",
    answersheetData: "",
  });
  const [examList, setExamList] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    async function getAllExams() {
      const res = await api.get("exam/exam/");
      setExamList([...res.data]);
    }
    getAllExams();
  }, []);

  useEffect(() => {
    if (displaySupplyScan) {
      function onScanSuccess(decodedText, decodedResult) {
        setScannedData({
          ...scannedData,
          answersheetData: decodedResult.decodedText,
        });
        setShowScanner({
          ...showScanner,
          suppyScanner: false,
        });
        setDisplaySupplyScan(false);
        html5QrcodeScanner
          .stop()
          .then((ignore) => {})
          .catch((err) => {});
      }

      var html5QrcodeScanner = new Html5Qrcode("invigSupplyReader", {
        fps: 10,
        qrbox: 250,
      });
      const config = { fps: 10, qrbox: { width: 230, height: 230 } };

      html5QrcodeScanner.start(
        { facingMode: "environment" },
        config,
        onScanSuccess
      );
    }
  }, [displaySupplyScan]);
  useEffect(() => {
    if (displayStudentScan) {
      function onScanSuccess(decodedText, decodedResult) {
        setScannedData({
          ...scannedData,
          studentData: decodedResult.decodedText,
        });
        setShowScanner({
          ...showScanner,
          studentScanner: false,
        });
        setDisplayStudentScan(false);
        html5QrcodeScanner
          .stop()
          .then((ignore) => {})
          .catch((err) => {});
      }
      var html5QrcodeScanner = new Html5Qrcode("invigStudentReader", {
        fps: 10,
        qrbox: 250,
      });
      const config = { fps: 10, qrbox: { width: 230, height: 230 } };

      html5QrcodeScanner.start(
        { facingMode: "environment" },
        config,
        onScanSuccess
      );
    }
  }, [displayStudentScan]);

  const submitData = async () => {
    const data = {
      student: scannedData.studentData,
      answersheet: scannedData.answersheetData,
      exam: selectedExam,
      invigilator: localStorage.getItem("userId"),
    };
    const response = await api.post("exam/student-sheet/", data);
    window.location.reload();
  };

  return (
    <LayOut>
      <div className={styles.invigilatorScanContainer}>
        <h1 style={{ padding: "1.6rem 0", textAlign: "center" }}>
          Invigilator Scan
        </h1>
        <div className={styles.selectExamDropDown}>
          <Select
            defaultValue="Select Exam"
            style={{ width: "100%" }}
            onChange={(e) => setSelectedExam(e)}
          >
            {examList &&
              examList.map((item) => {
                return (
                  <Option
                    value={`${item.id}`}
                    key={item.id}
                    onClick={(e) => console.log(e)}
                  >
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </div>
        <div className={styles.invigilatorScannners}>
          <div className={styles.invigilatorScannnerAndBtn}>
            <div className={styles.invigilatorScanner} id="invigSupplyReader">
              {!showScanner.suppyScanner && (
                <img src={successMsgTick2} alt="" />
              )}
            </div>
            <button
              className={styles.scanBtn}
              onClick={() => {
                setDisplaySupplyScan(true);
              }}
              disabled={
                displayStudentScan ||
                displaySupplyScan ||
                !showScanner.suppyScanner
              }
              style={
                displayStudentScan ||
                displaySupplyScan ||
                !showScanner.suppyScanner
                  ? { background: "#8181ff" }
                  : {}
              }
            >
              <h3>Scan Supply QrCode</h3>
            </button>
          </div>

          <div className={styles.invigilatorScannnerAndBtn}>
            <div className={styles.invigilatorScanner} id="invigStudentReader">
              {!showScanner.studentScanner && (
                <img src={successMsgTick1} alt="" />
              )}
            </div>
            <button
              className={styles.scanBtn}
              onClick={() => {
                setDisplayStudentScan(true);
              }}
              disabled={
                displaySupplyScan ||
                displaySupplyScan ||
                !showScanner.studentScanner
              }
              style={
                displayStudentScan ||
                displaySupplyScan ||
                !showScanner.studentScanner
                  ? { background: "#8181ff" }
                  : {}
              }
            >
              <h3>Scan Student QrCode</h3>
            </button>
          </div>
        </div>
        <button
          className={styles.scanNxtBtn}
          onClick={submitData}
          disabled={
            showScanner.studentScanner ||
            showScanner.suppyScanner ||
            !selectedExam
          }
          style={
            showScanner.studentScanner ||
            showScanner.suppyScanner ||
            !selectedExam
              ? { background: "#8181ff" }
              : {}
          }
        >
          <h3>Scan for Next Student</h3>
          <BsChevronRight size={23} color="white" />
        </button>
      </div>
    </LayOut>
  );
}

export default InvigilatorScan;
