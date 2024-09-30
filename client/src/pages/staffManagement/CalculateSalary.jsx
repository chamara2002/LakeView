import React, { useState } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

const SalaryCalculator = () => {
  const [month, setMonth] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [otHours, setOtHours] = useState("");
  const [normalSalary, setNormalSalary] = useState("");
  const [otSalary, setOtSalary] = useState("");
  const [finalSalary, setFinalSalary] = useState("");

  const calculateSalary = () => {
    const otPay = (normalSalary / 160) * 1.5 * otHours; // Calculate OT pay based on OT hours
    const finalPay = parseFloat(normalSalary) + otPay;
    setOtSalary(otPay.toFixed(2)); // Set OT salary to two decimal places
    setFinalSalary(finalPay.toFixed(2)); // Set final salary to two decimal places
  };

  const clearFields = () => {
    setMonth("");
    setTotalHours("");
    setOtHours("");
    setNormalSalary("");
    setOtSalary("");
    setFinalSalary("");
  };

  return (
    <div style={background}>
      <NavBar />
      <div style={formContainerStyle}>
        <div style={formStyle}>
          <h2 style={titleStyle}>Calculate Salary</h2>
          <form>
            {/* Total Hours */}
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="totalHours">Total Hours</label>
              <input
                type="number"
                id="totalHours"
                placeholder="Enter the total hours per month"
                value={totalHours}
                onChange={(e) => setTotalHours(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* OT Hours */}
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="otHours">OT Hours</label>
              <input
                type="number"
                id="otHours"
                placeholder="Enter the OT hours"
                value={otHours}
                onChange={(e) => setOtHours(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Normal Salary */}
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="normalSalary">Basic Salary</label>
              <input
                type="number"
                id="normalSalary"
                placeholder="Enter the basic salary per month"
                value={normalSalary}
                onChange={(e) => setNormalSalary(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={buttonContainerStyle}>
              <button
                type="button"
                onClick={calculateSalary}
                style={calculateButtonStyle}
              >
                Calculate
              </button>
            </div><br></br><br></br>

            {/* OT Salary */}
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="otSalary">OT Salary</label>
              <input
                type="number"
                id="otSalary"
                value={otSalary}
                readOnly
                style={inputStyle02}
              />
            </div>

            {/* Final Salary */}
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="finalSalary">Final Salary</label>
              <input
                type="number"
                id="finalSalary"
                value={finalSalary}
                readOnly
                style={inputStyle02}
              />
            </div>

            <div style={buttonContainerStyle}>
              <button
                type="button"
                onClick={clearFields}
                style={clearButtonStyle}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Styles
const background = {
  backgroundColor: "#161E38",
  minHeight: "100vh", // Changed to minHeight for better responsiveness
  display: 'flex',
  flexDirection: 'column',
};

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1, // Allow this container to grow
};

const formStyle = {
  marginBottom: "100px",
  marginTop: "100px",
  backgroundColor: '#1D284C',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  width: '400px',
};

const titleStyle = {
  textAlign: 'center',
  color: 'white',
  marginBottom: '20px',
};

const inputContainerStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: 'white',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const inputStyle02 = {
  width: '100%',
  padding: '10px',
  fontSize: '14px',
  borderRadius: '4px',
  border: 'black',
  boxSizing: 'border-box',
  backgroundColor: "#FFBB00",
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const calculateButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '48%',
};

const clearButtonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '48%',
};

export default SalaryCalculator;
