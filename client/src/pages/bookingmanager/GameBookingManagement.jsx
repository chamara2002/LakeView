import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";

const GameBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/bkg/game-bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching game bookings:", error));
  }, []);

  const handleConfirm = (bookingId) => {
    axios
      .put(`http://localhost:3000/api/bkg/game-bookings/${bookingId}`)
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, confirmed: true }
              : booking
          )
        );
      })
      .catch((error) => console.error("Error confirming booking:", error));
  };

  const handleDelete = (bookingId) => {
    axios
      .delete(`http://localhost:3000/api/bkg/game-bookings/${bookingId}`)
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  // Generate custom Booking ID format like GB12345 (using last 5 characters of _id)
  const generateBookingId = (bookingId) => {
    const suffix = bookingId.slice(-5); // Taking the last 5 characters of the bookingId
    return `GB${suffix}`; // Custom booking ID with 'GB' prefix
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.game?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Booking ID", "Game Name", "Customer Email", "Seats", "Price", "Booking Status"];
    const tableRows = [];

    // Add data to the tableRows array
    filteredBookings.forEach((booking) => {
      const bookingData = [
        generateBookingId(booking._id),
        booking.game?.name || "Unknown Game",
        booking.customer?.email || "Unknown Customer",
        booking.seatNumbers ? booking.seatNumbers.length : 0,
        `Rs.${booking.totalPrice.toFixed(2)}`,
        booking.confirmed ? "Paid" : "Not paid",
      ];
      tableRows.push(bookingData);
    });

    // Generate the table in the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    // Calculate total bookings and total price
    const totalBookings = filteredBookings.length;
    const totalPrice = filteredBookings.reduce((acc, booking) => acc + booking.totalPrice, 0).toFixed(2);

    // Add totals below the table
    doc.text(`Total Bookings: ${totalBookings}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Price: Rs.${totalPrice}`, 14, doc.lastAutoTable.finalY + 20);

    // Save the PDF
    doc.save("game_bookings_report.pdf");
  };

  return (
    <div>
      <NavBar />
      <div style={{ backgroundColor: "#161E38", minHeight: "100vh", padding: "20px" }}>
        {/* Updated Search Bar CSS */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by game name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "50%",
              padding: "12px 20px",
              borderRadius: "30px",
              border: "2px solid #007BFF",
              fontSize: "16px",
              outline: "none",
              color: "#333",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0056b3")}
            onBlur={(e) => (e.target.style.borderColor = "#007BFF")}
          />
        </div>

        <div style={tableGridStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Booking ID</th> {/* Booking ID column */}
                <th style={thStyle}>Game Name</th>
                <th style={thStyle}>Customer Email</th>
                <th style={thStyle}>Seats</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Booking Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id} style={trStyle}>
                  <td style={tdStyle}>{generateBookingId(booking._id)}</td> {/* Display custom Booking ID */}
                  <td style={tdStyle}>{booking.game?.name || "Unknown Game"}</td>
                  <td style={tdStyle}>{booking.customer?.email || "Unknown Customer"}</td>
                  <td style={tdStyle}>{booking.seatNumbers ? booking.seatNumbers.length : 0}</td>
                  <td style={tdStyle}>Rs.{booking.totalPrice.toFixed(2)}</td>
                  <td style={tdStyle}>{booking.confirmed ? "Paid" : "Not paid"}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleConfirm(booking._id)}
                      disabled={booking.confirmed}
                      style={{
                        ...cardButtonStyle,
                        backgroundColor: booking.confirmed ? "#28a745" : "#007bff",
                        cursor: booking.confirmed ? "default" : "pointer",
                        marginRight: "10px",
                      }}
                    >
                      {booking.confirmed ? "Payment confirmed" : "Confirm Payment"}
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      style={{
                        ...cardButtonStyle,
                        backgroundColor: "#dc3545",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <center>
          <button
            onClick={generatePDF}
            style={{
              backgroundColor: "#28a745", // Light green color
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Generate Report
          </button>
        </center>
      </div>
      <Footer />
    </div>
  );
};

// Styles
const tableGridStyle = {
  display: "block",
  width: "100%",
  overflowX: "auto",
  whiteSpace: "nowrap",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#1b1f38",
  color: "#fff",
};

const thStyle = {
  padding: "12px",
  backgroundColor: "#2a2f55",
  textAlign: "left",
  fontSize: "16px",
  borderBottom: "2px solid #444",
};

const trStyle = {
  borderBottom: "1px solid #444",
};

const tdStyle = {
  padding: "12px",
  fontSize: "16px",
};

const cardButtonStyle = {
  padding: "8px 16px",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default GameBookingManagement;
