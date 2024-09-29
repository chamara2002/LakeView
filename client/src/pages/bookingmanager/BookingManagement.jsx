import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  // Handle generating PDF report with custom colors
const handleDownloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Event Booking Report", 14, 20); // Report title

  const tableColumn = ["Event Name", "Customer Email", "Price", "Payment Status"];
  const tableRows = filteredPayments.map((payment) => [
    payment.event?.name || "Unknown Event",
    payment.participant?.email || "Unknown Customer",
    `$${payment.amount}`,
    payment.status,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: {
      fillColor: [30, 144, 255], // Light blue cell background
      textColor: [0, 0, 0], // White text in cells
      halign: 'center', // Center-align text in cells
    },
    headStyles: {
      fillColor: [0, 51, 102], // Dark blue for header background
      textColor: [200, 200, 200], // White text in headers
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240], // Light gray background for alternate rows
    },
  });

  doc.save("event_booking_report.pdf"); // Save PDF with the filename
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
        {/* Payments table */}
        <table
          style={{ width: "100%", borderCollapse: "collapse", color: "#fff" }}
        >
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
                  <td style={tdStyle}>
                    {payment.event?.name || "Unknown Event"}
                  </td>
                  <td style={tdStyle}>{payment.participant.email}</td>
                  <td style={tdStyle}>${payment.amount}</td>
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
        <br />
        {/* Generate report button */}
        <center>
          <button onClick={handleDownloadPDF} style={styles.button}>
            Generate Report
          </button>
        </center>
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

// Button styles
const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default BookingManagement;
