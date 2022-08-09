import React, { useState, useEffect } from "react";
import LayOut from "../components/LayOut";
import styles from "../styles/TeacherCorrection.module.scss";
import { BsChevronRight } from "react-icons/bs";
import { Html5Qrcode } from "html5-qrcode";
import successMsgTick1 from "../assets/successTick1.gif";
import api from "../api/ProtectedApi";

function TeacherCorrection() {
  const [displayScan, setDisplayScan] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [marks, setMarks] = useState(0);

  useEffect(() => {
    if (displayScan) {
      function onScanSuccess(decodedText, decodedResult) {
        setScannedData(decodedText);

        html5QrcodeScanner
          .stop()
          .then((ignore) => {})
          .catch((err) => {});
      }
      var html5QrcodeScanner = new Html5Qrcode("teacherCorrectionScanner", {
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
  }, [displayScan]);

  const handleSubmit = async () => {
    const data = {
      answersheet: scannedData,
      marks: marks,
      examiner: localStorage.getItem("userId"),
    };
    const res = await api.post("exam/marks/", data);
    window.location.reload();
  };

  return (
    <LayOut>
      <div className={styles.teacherCorrectionContainer}>
        <h1 style={{ padding: "1.6rem 0", textAlign: "center" }}>
          Teacher Correction
        </h1>
        <div className={styles.teacherCorrectionScannerContainer}>
          <div>
            <div
              className={styles.teacherCorrectionScanner}
              id="teacherCorrectionScanner"
            >
              {scannedData && <img src={successMsgTick1} alt="" />}
            </div>
            <button
              className={styles.scanBtn}
              onClick={() => {
                setDisplayScan(true);
              }}
            >
              <h3>Scan Supply QrCode</h3>
            </button>
          </div>
          <div>
            <input
              type="number"
              placeholder="Marks Obtain"
              required
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>
        </div>
        <button
          className={styles.scanNxtBtn}
          onClick={handleSubmit}
          disabled={!scannedData || !marks}
          style={!scannedData || !marks ? { background: "#8181ff" } : {}}
        >
          <h3>Scan Next AnswerSheet</h3>
          <BsChevronRight size={23} color="white" />
        </button>
      </div>
    </LayOut>
  );
}

export default TeacherCorrection;
