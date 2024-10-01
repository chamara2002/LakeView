import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";

const BookingManagement = () => {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch payments when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/payment/view-payments")
      .then((response) => setPayments(response.data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  // Handle confirming a payment
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

  // Handle deleting a payment
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

  // Filter payments based on search query
  const filteredPayments = payments.filter((payment) =>
    payment.event?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate Booking ID based on payment ID
  const generateBookingId = (paymentId) => {
    return `EB${paymentId.slice(-5)}`; // Custom Booking ID with 'EB' prefix followed by last 5 characters of payment ID
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundColor: "#161E38",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {/* Search input */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by event name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "400px", // Increased width
              padding: "12px 40px", // Adjusted padding for a better look
              borderRadius: "25px",
              border: "2px solid #007bff", // Bright border color
              fontSize: "16px",
              color: "#000",
              boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)", // Enhanced shadow for depth
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              outline: "none",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "0 4px 12px rgba(0, 123, 255, 0.5)")
            } // Change shadow on focus
            onBlur={(e) =>
              (e.target.style.boxShadow =
                "0 4px 12px rgba(0, 123, 255, 0.3)")
            } // Reset shadow on blur
          />
          <span
            style={{
              position: "absolute",
              color: "#007bff",
              marginLeft: "-30px",
              marginTop: "4px",
            }}
          >
            🔍
          </span>
        </div>

        {/* Payments table */}
        <table
          style={{ width: "100%", borderCollapse: "collapse", color: "#fff" }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Booking ID</th>
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
                  <td style={tdStyle}>
                    {generateBookingId(payment._id)} {/* Display Booking ID */}
                  </td>
                  <td style={tdStyle}>
                    {payment.event?.name || "Unknown Event"}
                  </td>
                  <td style={tdStyle}>{payment.participant.email}</td>
                  <td style={tdStyle}>Rs.{payment.amount}</td>
                  <td style={tdStyle}>{payment.status}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleConfirm(payment._id)}
                      disabled={payment.status === "accepted"}
                      style={{
                        padding: "8px 16px",
                        backgroundColor:
                          payment.status === "accepted" ? "#28a745" : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor:
                          payment.status === "accepted" ? "default" : "pointer",
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

// Inline styles for table headers and data cells
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

export default BookingManagement;
