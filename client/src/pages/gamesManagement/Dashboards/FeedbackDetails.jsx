import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../foodManagement/context/authContext";
import NavBar from "../../../components/core/NavBar";
import Footer from "../../../components/core/Footer";
import ReportButton from "../../../components/reUseable/ReportButton";
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import autoTable plugin for jsPDF

const FeedbackDetails = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { user } = useAuth();

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/games/games/feedbacks"
      );
      setFeedbacks(response.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (gameId, feedbackId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/games/games/${gameId}/feedbacks/${feedbackId}`
      );
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback._id !== feedbackId)
      );
      fetchFeedbacks();
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Add title to the PDF
    doc.text("Feedback and Ratings Details Report", 14, 20);

    // Filter feedbacks based on search query
    const filteredFeedbacks = feedbacks.filter(feedback =>
      feedback.gameName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Format data for autoTable based on filtered feedbacks
    const tableData = filteredFeedbacks.map(feedback => [
      feedback.gameId,
      feedback.gameName,
      feedback.user,
      feedback.feedback,
      feedback.score
    ]);

    // Add autoTable with filtered feedback data
    doc.autoTable({
      head: [['Game ID', 'Game Name', 'User', 'Feedback', 'Ratings']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [22, 30, 56] },  // Table header style
      styles: { cellPadding: 3, fontSize: 10 }
    });

    // Save the PDF
    doc.save('feedback_and_ratings_details_report.pdf');
  };

  // Filter feedbacks based on the search query
  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.gameName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavBar />

      <div style={styles.pageContainer}>
        <h2 style={styles.heading}>Feedback and Ratings Details</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Game Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderCell}>Game ID</th>
              <th style={styles.tableHeaderCell}>Game Name</th>
              <th style={styles.tableHeaderCell}>User</th>
              <th style={styles.tableHeaderCell}>Feedback</th>
              <th style={styles.tableHeaderCell}>Rating (stars)</th>
              {user.user.role ? (
                <th style={styles.tableHeaderCell}>Action</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback.feedbackId} style={styles.tableRow}>
                <td style={styles.tableCell}>{feedback.gameId}</td>
                <td style={styles.tableCell}>{feedback.gameName}</td>
                <td style={styles.tableCell}>{feedback.user}</td>
                <td style={styles.tableCell}>{feedback.feedback}</td>
                <td style={styles.tableCell}>{feedback.score}</td>
                {user.user.role ? (
                  <td style={styles.tableCell}>
                    <button
                      style={styles.deleteButton}
                      onClick={() =>
                        handleDelete(feedback.gameId, feedback.feedbackId)
                      }
                    >
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        <br/><br></br><br></br>
        <button style={styles.exportButton} onClick={handleExportPDF}>
          Export Report as PDF
        </button>
        <br /><br></br><br></br>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#161E38",
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "yellow",
    marginBottom: "60px",
    textAlign: "center",
  },
  searchBar: {
    padding: "10px",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  table: {
    width: "100%",
    maxWidth: "1200px",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#2E3A59",
  },
  tableHeaderCell: {
    padding: "12px",
    borderBottom: "1px solid #444",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid #444",
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  exportButton: {
    padding: "10px 20px",
    backgroundColor: '#FFD700',
    color: "#000000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default FeedbackDetails;
