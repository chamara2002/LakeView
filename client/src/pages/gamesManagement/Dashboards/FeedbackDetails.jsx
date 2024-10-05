import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../foodManagement/context/authContext";
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

    // Company Information
    const companyName = "LakeView Gaming Zone"; 
    const companyAddress = "Gampaha, Sri Lanka"; 
    const companyPhone = "+9433-7628316"; 
    const companyEmail = "lakeviewgaming01@gmail.com"; 

    // Logo (Replace with your actual base64 string or image URL)
    const logo = "reportLogo.png"; 

    // Add the logo to the PDF
    doc.addImage(logo, "PNG", 150, 10, 40, 35); 

    // Add company information to the PDF
    doc.setFontSize(14);
    doc.text(companyName, 20, 20);
    doc.setFontSize(10);
    doc.text(companyAddress, 20, 30);
    doc.text(companyPhone, 20, 35);
    doc.text(companyEmail, 20, 40);
    
    // Add a line for separation
    doc.line(20, 45, 190, 45); 

    // Add the report title
    doc.setFontSize(16);
    doc.text("Feedback and Ratings Details Report", 60, 60);

    // Filter feedbacks based on search query
    const filteredFeedbacks = feedbacks.filter(feedback =>
      feedback.gameName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Format data for autoTable based on filtered feedbacks
    const tableData = filteredFeedbacks.map(feedback => [
      "GID"+feedback.gameId.slice(-4),
      feedback.gameName,
      feedback.user,
      feedback.feedback,
      feedback.score
    ]);

    // Add autoTable with filtered feedback data
    doc.autoTable({
      head: [['Game ID', 'Game Name', 'User', 'Feedback', 'Rating']],
      body: tableData,
      startY: 70,
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
      <div style={styles.pageContainer}>
        <h2 style={styles.heading}>Feedback and Ratings Details</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by game name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        /><br></br>

        <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderCell}>Game ID</th>
              <th style={styles.tableHeaderCell}>Game Name</th>
              <th style={styles.tableHeaderCell}>User Name</th>
              <th style={styles.tableHeaderCell}>Feedback</th>
              <th style={styles.tableHeaderCell}>Rating(Stars)</th>
              {/*{user.user.role ? (
                <th style={styles.tableHeaderCell}>Action</th>
              ) : null}*/}
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback.feedbackId} style={styles.tableRow}>
                <td style={styles.tableCell}>{"GID" + feedback.gameId.slice(-4)}</td>
                <td style={styles.tableCell}>{feedback.gameName}</td>
                <td style={styles.tableCell}>{feedback.user}</td>
                <td style={styles.tableCell}>{feedback.feedback}</td>
                <td style={styles.tableCell}>{feedback.score}</td>
                {/*{user.user.role ? (
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
                ) : null}*/}
              </tr>
            ))}
          </tbody>
        </table>
        </div>

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
    color: "#fff",
    padding: "10px",
  },
  searchBar: {
    marginBottom: "10px",
    padding: "10px",
    width: "40%",
    borderRadius: "5px",
    border: "1px solid #2C3354",
    backgroundColor: "#243055",
    color: "#fff",
  },
  tableContainer: {
    backgroundColor: "#1E2749",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    width:"1025px"
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
    backgroundColor: "#FF4C4C",
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
