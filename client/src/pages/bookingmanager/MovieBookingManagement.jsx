import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import ReportButton from "../../components/reUseable/ReportButton";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MovieBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/bkm/MovieBookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching movie bookings:", error));
  }, []);

  const handleConfirm = (bookingId) => {
    axios
      .put(`http://localhost:3000/api/bkm/bookings/${bookingId}`)
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
      .delete(`http://localhost:3000/api/bkm/bookings/${bookingId}`)
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.movie?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSeats = filteredBookings.reduce(
    (acc, booking) =>
      acc + (booking.seatNumbers ? booking.seatNumbers.length : 0),
    0
  );
  const totalRevenue = filteredBookings.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0
  );

  const generateBookingId = (booking) => {
    const shortId = booking._id.slice(-5);
    return `MB${shortId}`;
  };

  const confirmedCount = filteredBookings.filter(
    (booking) => booking.confirmed
  ).length;
  const notConfirmedCount = filteredBookings.length - confirmedCount;

  const pieData = {
    labels: ["Confirmed", "Not Confirmed"],
    datasets: [
      {
        label: "Booking Status",
        data: [confirmedCount, notConfirmedCount],
        backgroundColor: ["#28a745", "#dc3545"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // Prepare data for the second pie chart (Ticket numbers by movie)
  const movieTicketCounts = {};

  filteredBookings.forEach((booking) => {
    const movieName = booking.movie?.name || "Unknown Movie";
    const ticketCount = booking.seatNumbers
      ? booking.seatNumbers.length
      : 0;
    movieTicketCounts[movieName] =
      (movieTicketCounts[movieName] || 0) + ticketCount;
  });

  const moviePieData = {
    labels: Object.keys(movieTicketCounts),
    datasets: [
      {
        label: "Tickets Sold by Movie",
        data: Object.values(movieTicketCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const moviePieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <NavBar />
      <div
        style={{ backgroundColor: "#161E38", minHeight: "100vh", padding: "20px" }}
      >
        <div style={searchBarContainerStyle}>
          <input
            type="text"
            placeholder="Search by movie name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchBarStyle}
          />
        </div>

        <div style={tableGridStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Booking ID</th>
                <th style={thStyle}>Movie Name</th>
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
                  <td style={tdStyle}>{generateBookingId(booking)}</td>
                  <td style={tdStyle}>
                    {booking.movie?.name || "Unknown Movie"}
                  </td>
                  <td style={tdStyle}>
                    {booking.customer?.email || "Unknown Customer"}
                  </td>
                  <td style={tdStyle}>
                    {booking.seatNumbers ? booking.seatNumbers.length : 0}
                  </td>
                  <td style={tdStyle}>
                    Rs.{booking.totalPrice.toFixed(2)}
                  </td>
                  <td style={tdStyle}>
                    {booking.confirmed ? "Paid" : "Not paid"}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleConfirm(booking._id)}
                      disabled={booking.confirmed}
                      style={{
                        ...cardButtonStyle,
                        backgroundColor: booking.confirmed
                          ? "#28a745"
                          : "#007bff",
                        cursor: booking.confirmed ? "default" : "pointer",
                        marginRight: "10px",
                      }}
                    >
                      {booking.confirmed
                        ? "Payment confirmed"
                        : "Confirm Payment"}
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
          <ReportButton
            bookings={filteredBookings}
            title="Movie Bookings"
            fileName="movie_bookings_report.pdf"
          />
        </center>

        {/* Container for Pie Charts */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "20px auto",
            width: "80%",
          }}
        >
          {/* First Pie Chart for Booking Status */}
          <div style={{ width: "35%" }}>
            <h3 style={{ color: "#fff", textAlign: "center" }}>
              Booking Status Breakdown
            </h3>
            <Pie data={pieData} options={pieOptions} />
          </div>

          {/* Second Pie Chart for Tickets Sold by Movie */}
          <div style={{ width: "35%" }}>
            <h3 style={{ color: "#fff", textAlign: "center" }}>
              Tickets Sold by Movie
            </h3>
            <Pie data={moviePieData} options={moviePieOptions} />
          </div>
        </div>

        {/* Generate Pie Chart Button */}
        <center>
          <button style={generateChartButtonStyle}>Generate Pie Chart</button>
        </center>
      </div>
      <Footer />
    </div>
  );
};

// Styles
const searchBarContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

const searchBarStyle = {
  width: "60%",
  maxWidth: "800px",
  padding: "15px 20px",
  borderRadius: "30px",
  border: "1px solid #ccc",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  outline: "none",
  fontSize: "16px",
  backgroundColor: "#f9f9f9",
  color: "#333",
};

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

const generateChartButtonStyle = {
  backgroundColor: "#28a745", // Light green color
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};

export default MovieBookingManagement;
