import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import { useNavigate } from "react-router-dom";

const BookingManagement = () => {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/payment/view-payments")
      .then((response) => setPayments(response.data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  const handleConfirm = (paymentId) => {
    axios
      .put(`http://localhost:3000/api/payment/update-payment/${paymentId}`)
      .then((response) => {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === paymentId
              ? { ...payment, status: "accepted" }
              : payment
          )
        );
      })
      .catch((error) => console.error("Error confirming payment:", error));
  };

  const handleDelete = (paymentId) => {
    axios
      .delete(`http://localhost:3000/api/payment/delete-payment/${paymentId}`)
      .then((response) => {
        setPayments((prevPayments) =>
          prevPayments.filter((payment) => payment._id !== paymentId)
        );
      })
      .catch((error) => console.error("Error deleting payment:", error));
  };

  const filteredPayments = payments.filter((payment) =>
    payment.event?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      
      <div style={{ backgroundColor: "#161E38", minHeight: "100vh", padding: "20px" }}>
        <input
          type="text"
          placeholder="Search by event name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            color: "#000",
          }}
        />
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff" }}>
          <thead>
            <tr>
              <th style={thStyle}>Event Name</th>
              <th style={thStyle}>Customer Email</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Payment Status</th>
              <th style={thStyle}>Confirm</th>
              <th style={thStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) =>
              payment.participant && payment.participant.email ? (
                <tr key={payment._id}>
                  <td style={tdStyle}>{payment.event?.name || "Unknown Event"}</td>
                  <td style={tdStyle}>{payment.participant.email}</td>
                  <td style={tdStyle}>${payment.amount}</td>
                  <td style={tdStyle}>{payment.status}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleConfirm(payment._id)}
                      disabled={payment.status === "accepted"}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: payment.status === "accepted" ? "#28a745" : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: payment.status === "accepted" ? "default" : "pointer",
                      }}
                    >
                      {payment.status === "accepted" ? "Accepted" : "Confirm"}
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(payment._id)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

// Inline styles
const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "12px",
  textAlign: "left",
  color: "#ddd",
};

const tdStyle = {
  borderBottom: "1px solid #ddd",
  padding: "12px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default BookingManagement;
