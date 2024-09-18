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
    // Example calculation logic normalSalary / 160) * 4
    const otPay =(normalSalary / 160) * 2
    const finalPay = parseFloat(normalSalary) + otPay;
    setOtSalary(otPay);
    setFinalSalary(finalPay);
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
    <div>
      <NavBar></NavBar>
      <div
      style={{
        backgroundColor: "#2a2a40",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "#d1d1d1",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center", margin: "0 0 20px 0" }}>
          Calculate Salary
        </h2>

        <form>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="totalHours" style={{ display: "block" }}>
              Total Hours
            </label>
            <input
              type="number"
              id="totalHours"
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="otHours" style={{ display: "block" }}>
              OT Hours
            </label>
            <input
              type="number"
              id="otHours"
              value={otHours}
              onChange={(e) => setOtHours(e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="normalSalary" style={{ display: "block" }}>
              Normal Salary
            </label>
            <input
              type="number"
              id="normalSalary"
              value={normalSalary}
              onChange={(e) => setNormalSalary(e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="otSalary" style={{ display: "block" }}>
              OT Salary
            </label>
            <input
              type="number"
              id="otSalary"
              value={otSalary}
              readOnly
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="finalSalary" style={{ display: "block" }}>
              Final Salary
            </label>
            <input
              type="number"
              id="finalSalary"
              value={finalSalary}
              readOnly
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={calculateSalary}
              style={{
                backgroundColor: "#ffcc00",
                padding: "10px",
                border: "none",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={clearFields}
              style={{
                backgroundColor: "#000000",
                padding: "10px",
                border: "none",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default SalaryCalculator;
