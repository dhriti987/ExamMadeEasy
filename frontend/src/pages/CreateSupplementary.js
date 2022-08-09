import React, { useState } from "react";
import Layout from "../components/LayOut";
import commonStyles from "../styles/Common.module.scss";
import QRCode from "qrcode";
import { saveAs } from "file-saver";
import api from "../api/ProtectedApi";

function CreateSupplementary() {
  const [numberOfSupply, setNumberOfSupply] = useState(0);

  const generateQrCode = async (testId) => {
    try {
      const response = await QRCode.toDataURL(testId);
      saveAs(response, "image.jpg");
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post(`exam/answersheet/?n=${numberOfSupply}`, {});
    res.data.forEach((item) => {
      generateQrCode(item.qr_code);
    });
  };

  return (
    <Layout>
      <div className={commonStyles.container}>
        <h1 style={{ padding: "1.6rem 0", textAlign: "center" }}>
          Create Supplementary
        </h1>
        <form className={commonStyles.fillForm} onSubmit={onSubmit}>
          <input
            type="number"
            placeholder="Number of Supplementaries"
            onChange={(e) => setNumberOfSupply(e.target.value)}
            value={numberOfSupply}
            required
          />
          <button type="submit" className={commonStyles.formBtn}>
            <h3>Create</h3>
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateSupplementary;
